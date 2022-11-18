'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('niveles_atencion', [
      { nombre: 'Primer nivel de atencion', descripcion: '' },
      { nombre: 'Segundo nivel de atencion', descripcion: '' },
      { nombre: 'Tercer nivel de atencion', descripcion: '' }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('niveles_atencion', null, {});
  }
};
