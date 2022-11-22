const { sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, dataNotFound, internalServerError, actionNotAllowed } = require("../helpers/responses");
const locationService = require('../Services/location.service');
const residenceService = require('../Services/residence.service');
const userService = require('../Services/user.service');

module.exports = {
    async createResidence(req, res) {
        try {
            const { body } = req;
            const location = await locationService.getById(body.localidad_id);
            if(!location){
                return dataNotFound(res, 'Localidad');
            }

            if(await userService.isAdmin(req.session_userId)){ 
                const created = await sequelize.transaction(async (t) => {
                    return await residenceService.create(body);
                });
                return transactionExecutedSuccessfully(res, created);  
            } else {
                return await actionNotAllowed(res, null);
            }
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);       
        }
    }
}