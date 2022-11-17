'use strict';

const { Provincias } = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {

    const laRioja = await Provincias.findOne({where: { nombre: 'La Rioja'}});

    await queryInterface.bulkInsert('departamentos', [
      { nombre: 'Capital', descripcion: 'Departamento', provincia_id: laRioja.id },
      { nombre: 'Chilecito', descripcion: 'Departamento', provincia_id: laRioja.id },
      { nombre: 'Arauco', descripcion: 'Departamento', provincia_id: laRioja.id },
      { nombre: 'San Blas de los Sauces', descripcion: 'Departamento', provincia_id: laRioja.id },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departamentos', null, {});
  }
};
