'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('perfiles', [{
      nombre: 'Administrador',
      descripcion: 'Administra todo el sistema'
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('perfiles', null, {});
  }
};
