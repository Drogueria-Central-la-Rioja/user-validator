'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('domicilios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      direccion_completa: {
        type: Sequelize.STRING
      },
      provincia_id: {
        type: Sequelize.INTEGER
      },
      departamento_id: {
        type: Sequelize.INTEGER
      },
      localidad_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('domicilios');
  }
};