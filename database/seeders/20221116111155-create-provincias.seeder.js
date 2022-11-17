'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('provincias', [
      { nombre: 'La Rioja', descripcion: 'Provincia' },
      { nombre: 'Catamarca', descripcion: 'Provincia' },
      { nombre: 'Salta', descripcion: 'Provincia' },
      { nombre: 'San Juan', descripcion: 'Provincia' },
      { nombre: 'San Luis', descripcion: 'Provincia' },
      { nombre: 'Jujuy', descripcion: 'Provincia' },
      { nombre: 'Santiago del Estero', descripcion: 'Provincia' },
      { nombre: 'Tucuman', descripcion: 'Provincia' },
      { nombre: 'Formosa', descripcion: 'Provincia' },
      { nombre: 'Chaco', descripcion: 'Provincia' },
      { nombre: 'Entre Rios', descripcion: 'Provincia' },
      { nombre: 'Corrientes', descripcion: 'Provincia' },
      { nombre: 'Misiones', descripcion: 'Provincia' },
      { nombre: 'Córdoba', descripcion: 'Provincia' },
      { nombre: 'La Pampa', descripcion: 'Provincia' },
      { nombre: 'Santa Fe', descripcion: 'Provincia' },
      { nombre: 'Buenos Aires', descripcion: 'Provincia' },
      { nombre: 'Mendoza', descripcion: 'Provincia' },
      { nombre: 'Neuquén', descripcion: 'Provincia' },
      { nombre: 'Santa Cruz', descripcion: 'Provincia' },
      { nombre: 'Rio Negro', descripcion: 'Provincia' },
      { nombre: 'Tierra del Fuego', descripcion: 'Provincia' }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provincias', null, {});
  }
};
