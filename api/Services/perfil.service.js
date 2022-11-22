const { Perfiles, Perfiles_Usuarios } = require('../../models/index');

module.exports = {

    async getAll() {
        return await Perfiles.findAll();
    },

    async create(data, transaction) {
        const profile = await Perfiles.create(data, { transaction });
        return profile.dataValues;
    },

    async getOne(perfil_id) {
        return await Perfiles.findByPk(perfil_id);
    },

    async bindUser(usuario_id, perfil_id) {
        return Perfiles_Usuarios.create({
            usuario_id,
            perfil_id,
            estado:     'Activo'
        });
    },

    async assignedProfile(user_id, profile_id) {
        let exist = false;
        let profile = await Perfiles_Usuarios.findOne({
            where: { usuario_id: user_id, perfil_id: profile_id }
        });
        if(profile){
            exist = true;
        }
        // remove this comment
        return exist;
    }
}