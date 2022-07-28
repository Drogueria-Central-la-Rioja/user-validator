'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('perfiles_usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      perfil_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('perfiles_usuarios');
  }
};