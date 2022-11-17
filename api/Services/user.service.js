const { Usuarios, Personas, Perfiles_Usuarios } = require('../../models/index');
const { USER_STATUS } = require('../Utils/commons');

module.exports = {

    async create(data, transaction) {

        const dataPersonal = data.datosPersonales;
        const newUser = await Usuarios.create({
            username:       data.username,
            password:       data.password,
            dependencia_id: data.dependencia_id,
            estado:         'Activo', // Change for Constant(ENUM)
            datosPersonales: {
                nombres:            dataPersonal.nombres,
                apellidos:          dataPersonal.apellidos,
                dni:                dataPersonal.dni,
                email:              dataPersonal.email,
                telefono:           dataPersonal.telefono,
                domicilio_completo: dataPersonal.domicilio_completo
            }
        },{
            include: 'datosPersonales',
        //    attributes: { exclude: ['password','updatedAt'] },
            transaction
        });

        if(newUser.dataValues) {
            delete newUser.dataValues.password;
            delete newUser.dataValues.updatedAt;
            delete newUser.dataValues.datosPersonales.dataValues.id;
            return newUser;
        } else {
            return null;
        }
        
    },

    async updateData(user_id, data, transaction) {

        let user = await Usuarios.findByPk(user_id);
        let person = await Personas.findByPk(user.dataValues.persona_id);

        await person.update(data.datosPersonales, { transaction });
        delete data.datosPersonales;
        await user.update(data, { transaction });
        return true;
    },

    async getOne(user_id) {
        return await Usuarios.findByPk(user_id, {
            attributes: ['username', 'persona_id', 'estado'],
            include: [
                {
                    association: 'datosPersonales',
                    attributes: ['nombres','apellidos','dni','telefono','email','domicilio_completo']
                },
                {
                    association: 'perfilesUsuario',
                    attributes: ['estado'],
                    include: [{
                        association: 'perfilAsignado',
                        attributes: ['id','nombre']
                    }]
                }
            ]
        });
    },

    async getAll() {
        return await Usuarios.findAll({
            attributes: ['username', 'persona_id', 'estado'],
            include: {
                association: 'perfilesUsuario',
                attributes: ['estado'],
                include: [{
                    association: 'perfilAsignado',
                    attributes: ['id','nombre']
                }]
            }
        });
    },

    async getByName(username) {
        const user = await Usuarios.findOne({
            where: { username },
            attributes: ['id','username', 'password', 'persona_id', 'estado', 'lastLogin'],
        });
        if(user){
            return user.dataValues;
        }else{
            return null;
        }
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