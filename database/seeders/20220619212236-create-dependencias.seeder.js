'use strict';

const { Domicilios, Niveles_atencion } = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const domicilios = await Domicilios.findAll({limit:5});
    const niveles = await Niveles_atencion.findAll({limit:5});
    await queryInterface.bulkInsert('dependencias', [
      { codigo: 'DROGCEN',
        tipo: 'efector',
        nombre_corto: 'Central',
        nombre_oficial: 'Drogueria Central',
        efector_salud: true,
        codigo_sisa: 'KKDOAS23',
        cuit: 20339238242,
        codigo_remediar: 'KJFDDS24',
        domicilio_id: domicilios[0].id,
        nivel_atencion_id: niveles[0].id,
        tipologia: 'test', 
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dependencias', null, {});
  }
};
