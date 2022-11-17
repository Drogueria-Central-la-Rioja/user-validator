const { Departamentos } = require('../../models/index');

module.exports = {
    async getByProvinceId(provincia_id) {
        return await Departamentos.findAll({
            where: { provincia_id },
            attributes: ['id','nombre']
        });
    },

    async create(data, transaction) {
        return await Departamentos.create(data, {
            transaction
        });
    }
}