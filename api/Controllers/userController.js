const { Usuarios, sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, recordCreationError, internalServerError, dataAlreadyExists, dataNotFound, dataNotAllowed, actionNotAllowed } = require('../helpers/responses');
const userService = require('../Services/user.service');
const { generateJWT } = require('../helpers/jwt');
const { encryptData } = require('../Utils/encryption');
const { isAllowedStatus } = require('../Services/user.service');

module.exports = {
    async getUsers(req, res){
        const users = await userService.getAll();
        return transactionExecutedSuccessfully(res, users);
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
            return internalServerError(res, error);      
        }
    },

    async createUser(req, res){

        try {
            // Check session user profile
            if(await userService.isAdmin(req.session_userId)){
                await sequelize.transaction( async (t) =>{
                    // NOTE: Username validation missing
                    const { username } = req.body;
                    if(await userService.getByName(username) == null) {
                        req.body.password = await encryptData(req.body.password);
                        const newUser = await userService.create(req.body, t);
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
                    } else {
                        return dataAlreadyExists(res, 'Usuario', 'Username', username);
                    }
                });  
            } else {
                return await actionNotAllowed(res, null);
            }       
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    },

    async updateUserData(req, res) {

        try {
            await sequelize.transaction( async (t) => {
                await userService.updateData(req.params.user_id, req.body, t);
                return transactionExecutedSuccessfully(res, null);
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
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
            return internalServerError(res, error);
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
            return internalServerError(res, error);
        }
    }
}