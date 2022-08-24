const { Perfiles } = require('../../models/index');

module.exports = {
    async create(data) {

    },

    async getOne(perfil_id) {
        return await Perfiles.getOne(perfil_id);
    }
}