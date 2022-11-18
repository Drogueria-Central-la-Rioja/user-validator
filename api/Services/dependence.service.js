const { Dependencias, Niveles_atencion } = require('../../models/index');

module.exports = {

    async getById(id) {
        return await Dependencias.findByPk(id);
    },

    async create(data, transaction) {
        const {
            codigo,tipo,nombre_corto,
            nombre_oficial,efector_salud,
            codigo_sisa,cuit,codigo_remediar,
            domicilio,nivel_atencion_id,tipologia
        } = data;

        return await Dependencias.create({
            codigo,
            tipo,
            nombre_corto,
            nombre_oficial,
            efector_salud,
            nombre_oficial,
            nombre_corto,
            nombre_oficial,
            codigo_sisa,
            cuit,
            codigo_remediar,
            domicilioDependencia: {
                descripcion:        domicilio.descripcion,
                direccion_completa: domicilio.direccion_completa,
                localidad_id:       domicilio.localidad_id
            },
            nivel_atencion_id,
            tipologia,
        },{
            include: 'domicilioDependencia',
            transaction
        });
    },

    async getAll() {
        return await Dependencias.findAll({
            include: {
                association: 'domicilioDependencia',
                attributes: { exclude: ['localidad_id'] },
                include: {
                    association: 'localidad'
                }
            }
        });
    },

    async getAttentionLevels() {
        return await Niveles_atencion.findAll();
    },

    async isAValidDependence(id) {
        return await this.getById(id) ? true : false;
    }
};