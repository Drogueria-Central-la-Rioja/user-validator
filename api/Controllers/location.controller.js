const { sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, dataNotFound, internalServerError, actionNotAllowed } = require("../helpers/responses");
const locationService = require('../Services/location.service');
const districtService = require("../Services/district.service");
const userService = require('../Services/user.service');

module.exports = {
    async getLocationsByDistrictId(req, res) {
        try {
            const { district_id } = req.params;
            const district = await districtService.getById(district_id);
            if(!district) {
                return dataNotFound(res, 'Departamento');
            }
            const locations = await locationService.getByDistrictId(district_id);
            return transactionExecutedSuccessfully(res, locations);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);  
        }
    },

    async createLocation(req, res) {
        try {
            const { body } = req;
            const district = await districtService.getById(body.departamento_id);
            if(!district){
                return dataNotFound(res, 'Departamento');
            }

            if(await userService.isAdmin(req.session_userId)){ 
                const created = await sequelize.transaction(async (t) => {
                    return await locationService.create(body);
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