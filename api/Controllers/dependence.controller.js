const { sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, internalServerError, dataNotFound, dataNotAllowed, actionNotAllowed } = require('../helpers/responses');
const userService = require('../Services/user.service');
const dependenceService = require('../Services/dependence.service');
const locationService = require('../Services/location.service');

module.exports = {
    async getDependencies(req, res){
        try {
            const dependencies = await dependenceService.getAll();
            return transactionExecutedSuccessfully(res, dependencies);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async createDependence(req, res){
        try {
            const { body } = req;
            if(! await locationService.isAValidLocation(body.domicilio.localidad_id)){
                return dataNotFound(res, 'Localidad');
            }
            // Check session user profile
            if(await userService.isAdmin(req.session_userId)){
                await sequelize.transaction( async (t) => {
                    const newDependence = await dependenceService.create(body, t);
                    return transactionExecutedSuccessfully(res, newDependence);
                });  
            } else {
                return await actionNotAllowed(res, null);
            }       
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    },

    async getAttentionLevels(req, res) {
        try {
            const attentionLevels = await dependenceService.getAttentionLevels();
            return transactionExecutedSuccessfully(res, attentionLevels);
        } catch (error) {
            console.log(error);
            return internalServerError(res, error.message);
        }
    }
}