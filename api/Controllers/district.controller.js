const { sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, dataNotFound, internalServerError, actionNotAllowed } = require("../helpers/responses");
const districtService = require("../Services/district.service");
const userService = require('../Services/user.service');
const provinceService = require('../Services/province.service');

module.exports = {
    async getDistrictsByProvinceId(req, res) {
        try {
            const { province_id } = req.params;
            const districts = await districtService.getByProvinceId(province_id);
            return transactionExecutedSuccessfully(res, districts);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async createDistrict(req, res) {
        try {
            const { body } = req;
            const province = await provinceService.getById(body.provincia_id);
            if(!province){
                return dataNotFound(res, 'Provincia');
            }

            if(await userService.isAdmin(req.session_userId)){ 
                const created = await sequelize.transaction(async (t) => {
                    return await districtService.create(body);
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