const { Usuarios, Personas } = require('../../models/index');

module.exports = {

    async create(data, transaction){

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

        if(newUser.dataValues){
            delete newUser.dataValues.password;
            delete newUser.dataValues.updatedAt;
            delete newUser.dataValues.datosPersonales.dataValues.id;
        //    console.log(JSON.stringify(newUser));
            return newUser;
        }else{
            return null;
        }
        
    },

    async updateData(user_id, data, transaction){

        let user = await Usuarios.findByPk(user_id);
        let person = await Personas.findByPk(user.dataValues.persona_id);

        await person.update(data.datosPersonales, { transaction });
        delete data.datosPersonales;
        await user.update(data, { transaction });
        return true;
    },

    async getOne(user_id){
        console.log('user: '+ user_id)
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

    async getAll(){
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

    async getByName(user_name){

        const user = await Usuarios.findOne({
            where: { usuario: user_name },
            attributes: ['id','usuario', 'password', 'persona_id', 'estado', 'lastLogin'],
        });

        if(user.dataValues){
            return user.dataValues;
        }else{
            return null;
        }
    
    }
};