const { Usuarios, sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, recordCreationError, internalServerError, badRequestError, dataNotFound } = require('../helpers/responses');
const userService = require('../Services/user.service');
const { generateJWT } = require('../helpers/jwt');
const { encryptData } = require('../Utils/encryption');

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
            await sequelize.transaction( async (t) =>{
                // NOTE: Username validation missing

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
            });         
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

    async deleteUser(req, res) {
        try {
            await sequelize.transaction(async (t) => {
                if(await userService.delete(req.params.user_id, t)) {
                    return transactionExecutedSuccessfully(res, null);
                } else {
                    return dataNotFound(res, 'Usuario');
                }
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    }
}