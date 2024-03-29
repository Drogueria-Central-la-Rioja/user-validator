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
      localidad_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'localidades',
          key: 'id'
        }
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