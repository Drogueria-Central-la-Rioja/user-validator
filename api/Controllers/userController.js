const { Usuarios, sequelize } = require('../../models/index');
const { transactionExecutedSuccessfully, recordCreationError, internalServerError } = require('../helpers/responses');
const userService = require('../Services/user.service');
const { generateJWT } = require('../helpers/jwt');
const { encryptData } = require('../Utils/encryption');

module.exports = {
    async getUsers(req, res){
        const usuarios = await Usuarios.findAll({
            attributes: ['usuario', 'persona_id', 'estado'],
            include: {
                association: 'perfilesUsuario',
                attributes: ['estado'],
                include: [{
                    association: 'perfilAsignado',
                    attributes: ['nombre']
                }]
            }
        });

        return transactionExecutedSuccessfully(res, usuarios);
    },

    async createUser(req, res){

        try {
            await sequelize.transaction( async (t) =>{
                // NOTE: Username validation missing

                req.body.password = await encryptData(req.body.password);
                const newUser = await userService.create(req.body, t);
                if(newUser){
                    const token = await generateJWT(newUser.id, newUser.usuario);
                    let data = {
                        usuario: newUser,
                        token
                    };
                    return transactionExecutedSuccessfully(res, data);
                }else{
                    return recordCreationError(res, 'Usuario')
                }
            });         
        } catch (error) {
            console.log(error);
            return internalServerError(res, error);
        }
    }
}