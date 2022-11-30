'use strict';

const { Localidades } = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const localidad = await Localidades.findOne({where: { nombre: 'Agua Blanca'}});
    await queryInterface.bulkInsert('domicilios', [
      { descripcion: 'Casa paterna', direccion_completa: 'Alvares Thomas 439 - Casa 46', localidad_id: localidad.id, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('domicilios', null, {});
  }
};
