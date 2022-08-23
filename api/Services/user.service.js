const { Usuarios, Personas } = require('../../models/index');
const { USER_STATUS } = require('../Utils/commons');

module.exports = {

    async create(data, transaction) {

        const dataPersonal = data.datosPersonales;
        const newUser = await Usuarios.create({
            usuario:        data.usuario,
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
        //    console.log(JSON.stringify(newUser));
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

    async delete(user_id, t) {

        // Falta verificar perfil: solo admin
        return await this.changeStatus(user_id, 'Eliminado', t);
    },

    async changeStatus(user_id, status, t) {
        let user = await Usuarios.findByPk(user_id);
        if(user) {
            await user.update({ estado: status }, { transaction: t });
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
    }
};