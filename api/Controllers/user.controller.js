const { Usuarios, sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, recordCreationError, internalServerError, dataAlreadyExists, dataNotFound, dataNotAllowed, actionNotAllowed, badRequestError } = require('../helpers/responses');
const userService = require('../Services/user.service');
const dependenceService = require('../Services/dependence.service');
const locationService = require('../Services/location.service');
const { generateJWT } = require('../helpers/jwt');
const { encryptData } = require('../Utils/encryption');
const { isAllowedStatus } = require('../Services/user.service');

module.exports = {
    async getUsers(req, res){
        try {
            const users = await userService.getAll();
            return transactionExecutedSuccessfully(res, users);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async getUserInfo(req, res){
        try {
            const user = await userService.getOne(req.params.user_id);
            if(user) {
                return transactionExecutedSuccessfully(res, user);
            } else {
                return dataNotFound(res, 'Usuario');
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);      
        }
    },

    async createUser(req, res){
        try {
            const { session_userId, body } = req;
            // Check session user profile
            if(await userService.isAdmin(session_userId)){
                await sequelize.transaction( async (t) =>{
                    const validations = await validateDataCreateUser(body, res);
                    if(validations){
                        return validations;
                    }
      
                    body.password = await encryptData(body.password);
                    const newUser = await userService.create(body, t);
                    if(newUser){
                        const token = await generateJWT(newUser.id, newUser.usuario);
                        let data = {
                            usuario: newUser,
                            token
                        };
                        return transactionExecutedSuccessfully(res, data);
                    }else{
                        return recordCreationError(res, 'Usuario')
                    }
                });  
            } else {
                return await actionNotAllowed(res, null);
            }       
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async updateUserData(req, res) {
        try {
            const { user_id } = req.params;
            const user = await Usuarios.findByPk(user_id);
            if(!user) {
                return dataNotFound(res, 'Usuario');
            }
            const updated = await sequelize.transaction( async (t) => {
                return await userService.updateData(user, req.body, t); 
            });
            return transactionExecutedSuccessfully(res, await userService.getOne(updated.id));
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async changeStatusUser(req, res) {
        try {
            // Check allowed status
            const { nuevo_estado } = req.body;
            if(! await isAllowedStatus(nuevo_estado)){
                return dataNotAllowed(res, 'nuevo_estado');
            }

            await sequelize.transaction(async (t) => {
                if(await userService.changeStatus(req.params.user_id, nuevo_estado, t)) {
                    return transactionExecutedSuccessfully(res, null);
                } else {
                    return dataNotFound(res, 'Usuario');
                }
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async deleteUser(req, res) {
        try {
            // Check session user profile
            if(await userService.isAdmin(req.session_userId)){

                const { user_id } = req.params;
                await sequelize.transaction(async (t) => {
                    if(await userService.delete(user_id, t)) {
                        return transactionExecutedSuccessfully(res, null);
                    } else {
                        return dataNotFound(res, 'Usuario');
                    }
                });
            } else {
                return await actionNotAllowed(res, null);
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    }
}

async function validateDataCreateUser(data, res) {
    const { username, dependencia_id, datosPersonales } = data;
    if(username && await userService.getByName(username) != null) {
        return dataAlreadyExists(res, 'Usuario', 'Username', username);
    }

    if(!await dependenceService.isAValidDependence(dependencia_id)) {
        return dataNotFound(res, 'Dependencia');
    }

    if(!await locationService.isAValidLocation(datosPersonales.domicilioPersona.localidad_id)) {
        return dataNotFound(res, 'Localidad');
    }
}