'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Perfiles_Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      perfilID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Perfiles_Usuarios');
  }
};