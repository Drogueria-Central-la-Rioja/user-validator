'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('niveles_atencion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('niveles_atencion');
  }
};