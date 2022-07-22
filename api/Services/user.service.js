const { Usuarios } = require('../../models/index');

module.exports = {

    async create(data, transaction){

        const dataPersona = data.datosPersonales;
        const newUser = await Usuarios.create({
            usuario:        data.usuario,
            password:       data.password,
            dependencia_id: data.dependencia_id,
            estado:         'Activo', // Change for Constant(ENUM)
            datosPersonales: {
                nombres:            dataPersona.nombres,
                apellidos:          dataPersona.apellidos,
                dni:                dataPersona.dni,
                email:              dataPersona.email,
                telefono:           dataPersona.telefono,
                domicilio_completo: dataPersona.domicilio_completo
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

    async getUserByName(user_name){

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