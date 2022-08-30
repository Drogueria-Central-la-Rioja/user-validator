const { transactionExecutedSuccessfully, actionNotAllowed, internalServerError } = require("../helpers/responses");
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
            await perfilService.bindUser(req.body);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    }
}