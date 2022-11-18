'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dependencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      nombre_corto: {
        type: Sequelize.STRING
      },
      nombre_oficial: {
        type: Sequelize.STRING
      },
      efector_salud: {
        type: Sequelize.BOOLEAN
      },
      codigo_sisa: {
        type: Sequelize.STRING
      },
      cuit: {
        type: Sequelize.INTEGER
      },
      codigo_remediar: {
        type: Sequelize.STRING
      },
      domicilio_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'domicilios',
          key: 'id'
        }
      },
      nivel_atencion_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'niveles_atencion',
          key: 'id'
        }
      },
      tipologia: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('dependencias');
  }
};