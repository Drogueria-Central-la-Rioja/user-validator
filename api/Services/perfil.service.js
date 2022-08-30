const { Perfiles, Perfiles_Usuarios } = require('../../models/index');

module.exports = {
    async create(data, transaction) {
        const profile = await Perfiles.create(data, { transaction });
        return profile.dataValues;
    },

    async getOne(perfil_id) {
        return await Perfiles.getOne(perfil_id);
    },

    async bindUser(data) {
        return await Perfiles_Usuarios.create({
            usuario_id: data.user_id,
            perfil_id:  data.perfil_id,
            estado:     'Activo'
        })
    }
}