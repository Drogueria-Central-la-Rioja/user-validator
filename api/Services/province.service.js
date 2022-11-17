const { Provincias } = require('../../models/index');

module.exports = {
    async getAll() {
        return await Provincias.findAll({
            attributes: ['id','nombre']
        }); 
    },

    async getById(id) {
        return await Provincias.findByPk(id);
    }
}