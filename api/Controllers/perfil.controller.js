const { 
    transactionExecutedSuccessfully,
    actionNotAllowed,
    internalServerError,
    dataNotFound,
    recordCreationError
} = require("../helpers/responses");
const { sequelize } = require('../../models/index');
const perfilService = require("../Services/perfil.service");
const userService = require("../Services/user.service");

module.exports = {

    async getProfiles(req, res) {
        try {
            const profiles = await perfilService.getAll();
            return await transactionExecutedSuccessfully(res, profiles);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async createProfile(req, res) {
        try {
            if(await userService.isAdmin(req.session_userId)){
                const profile = await sequelize.transaction(async (t) => {
                    return await perfilService.create(req.body, t);
                });
                return await transactionExecutedSuccessfully(res, profile);
            } else {
                return await actionNotAllowed(res, null);
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async updateProfile(req, res) {

    },

    async deleteProfile(req, res) {

    },

    async addUserProfile(req, res) {
        try {
            const { usuario_id, perfil_id } = req.body;
            if(await userService.getOne(usuario_id) && await perfilService.getOne(perfil_id)) {
                if(! await perfilService.assignedProfile(usuario_id, perfil_id)) {
                    const bind = await perfilService.bindUser(usuario_id, perfil_id);
                    return transactionExecutedSuccessfully(res, bind);
                } else {
                    return recordCreationError(res, 'Perfil de usuario. Ya se encuentra asignado el mismo para este usuario');
                }
            } else {
                return dataNotFound(res, 'Usuario o Perfil')
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    }
}