const { transactionExecutedSuccessfully, internalServerError, badRequestError, recordCreationError } = require("../helpers/responses");
const provinceService = require("../Services/province.service");

module.exports = {
    async getProvinces(req, res) {
        const provinces = await provinceService.getAll();
        return transactionExecutedSuccessfully(res, provinces);
    }
}