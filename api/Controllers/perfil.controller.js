const { transactionExecutedSuccessfully, actionNotAllowed, internalServerError, badRequestError, recordCreationError } = require("../helpers/responses");
const { sequelize } = require('../../models/index');
const perfilService = require("../Services/perfil.service");
const userService = require("../Services/user.service");

module.exports = {
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
            return internalServerError(res, error);
        }
    },

    async updateProfile(req, res) {

    },

    async deleteProfile(req, res) {

    },

    async addUserProfile(req, res) {
        try {
            if(! await perfilService.assignedProfile(req.body.usuario_id, req.body.perfil_id)) {
                const bind = await perfilService.bindUser(req.body);
                return transactionExecutedSuccessfully(res, bind);
            } else {
                return recordCreationError(res, 'Perfil de usuario. Ya se encuentra asignado el mismo para este usuario');
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    }
}