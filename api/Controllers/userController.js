const { Usuarios } = require('../../models/index');

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

        res.status(200).json({
            status: 200,
            usuarios,
            msg:    'Transacción ejecutada correctamente'
        });
    }
}