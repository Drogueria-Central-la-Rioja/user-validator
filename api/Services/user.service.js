const { 
 Usuarios,
 Personas,
 Perfiles_Usuarios,
 Domicilios } = require('../../models/index');
const { USER_STATUS } = require('../Utils/commons');

module.exports = {

    async create(data, transaction) {

        const { datosPersonales } = data;
        const newPerson = await Personas.create(datosPersonales, {
            include: 'domicilioPersona',
            transaction
        });

        const newUser = await Usuarios.create({
            username:       data.username,
            password:       data.password,
            persona_id:     newPerson.id,
            dependencia_id: data.dependencia_id,
            estado:         'Activo', // Change for Constant(ENUM)
        },{
            transaction
        });

        if(newUser.dataValues) {
            delete newUser.dataValues.password;
            delete newUser.dataValues.updatedAt;
            return newUser;
        } else {
            return null;
        }
        
    },

    async updateData(user, data, transaction) {

        const { datosPersonales } = data;
        if(datosPersonales) {
            let person = await Personas.findByPk(user.dataValues.persona_id);
            await person.update(datosPersonales, {
                transaction 
            });
            if(datosPersonales.domicilioPersona) {
                let domicilio = await Domicilios.findByPk(person.domicilio_id);
                await domicilio.update(datosPersonales.domicilioPersona, {
                    transaction 
                });
            }
        }

        delete data.datosPersonales;
        await user.update(data, { transaction });
        return user;
    },

    async getOne(user_id) {
        return await Usuarios.findByPk(user_id, fullInfoUser);
    },

    async getAll() {
        return await Usuarios.findAll(fullInfoUser);
    },

    async getByName(username) {
        const user = await Usuarios.findOne({
            where: { username },
            attributes: ['id','username', 'password', 'persona_id', 'estado', 'lastLogin'],
        });
        return user ? user.dataValues : null;
    },

    async delete(user_id, transaction) {
        return await this.changeStatus(user_id, 'Eliminado', transaction);
    },

    async changeStatus(user_id, status, transaction) {
        let user = await Usuarios.findByPk(user_id);
        if(user) {
            await user.update({ estado: status }, { transaction });
            return true;
        }
        return false;
    },

    async isAllowedStatus(status) {
        const _allowed = Object.values(USER_STATUS);
        if(!_allowed.includes(status.toUpperCase())){
            return false;
        }
        return true;
    },

    async getProfiles(user_id) {
        const perfiles = await Perfiles_Usuarios.findAll({
            where: { usuario_id: user_id },
            attributes: ['id', 'estado'],
            include: {
                association: 'perfilAsignado',
                attributes: ['id','nombre']
            }
        });
        return perfiles;
    },

    async isAdmin(user_id) {
        let isAdmin = false;
        const perfiles = await this.getProfiles(user_id);
        perfiles.forEach(e => {
            if(e.perfilAsignado.nombre.toUpperCase() == 'ADMINISTRADOR') {
                isAdmin = true;
            }
        });
        return isAdmin;
    }
};

const fullInfoUser = {
    attributes: { exclude: ['password', 'persona_id'] },
    include: [
        {
            association: 'datosPersonales',
            include: {
                attributes: { exclude: ['domicilio_id'] },
                association: 'domicilioPersona'
            }
        },
        {
            association: 'perfilesUsuario',
            attributes: ['estado'],
            include: {
                association: 'perfilAsignado',
                attributes: ['id','nombre']
            }
        }
    ]
}