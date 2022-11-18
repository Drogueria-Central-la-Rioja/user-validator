const { Localidades } = require('../../models/index');

module.exports = {
    async getById(id) {
        return await Localidades.findByPk(id);
    },

    async getByDistrictId(departamento_id) {
        return await Localidades.findAll({
            where: { departamento_id },
            attributes: ['id','nombre']
        });
    },

    async create(data, transaction) {
        return await Localidades.create(data, {
            transaction
        });
    },

    async isAValidLocation(id) {
        return await this.getById(id) ? true : false;
    }
}