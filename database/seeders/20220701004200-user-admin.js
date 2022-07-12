'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // TODO: Create transaction here
    queryInterface.bulkInsert('Perfiles_Usuarios', [{
      nombre: 'administrator',
      description: 'administrator'
    }])
    queryInterface.bulkInsert('Usuarios', [{
      usuario: 'admin',
      password: 'admin',  // TODO: Change this this should be encrypted
      persona_id: null,
      dependencia_id: null,
      estado: "admin",
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Perfiles_Usuarios', null, {});
  }
};