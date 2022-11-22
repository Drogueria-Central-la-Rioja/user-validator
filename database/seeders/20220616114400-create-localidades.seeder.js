'use strict';

const { Departamentos } = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const capital = await Departamentos.findOne({where: { nombre: 'Capital'}});
    await queryInterface.bulkInsert('localidades', [
      { nombre: 'Agua Blanca', descripcion: 'Localidad', departamento_id: capital.id },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('localidades', null, {});
  }
};
