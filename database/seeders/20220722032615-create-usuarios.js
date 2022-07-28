'use strict';

const { encryptData } = require('../../api/Utils/encryption');
const {Personas} = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let usuarios = [];
    const personas = await Personas.findAll();
    personas.forEach((persona) => {

      usuarios.push({
        username:    'admin',
        password:   '123',
        persona_id: persona.id,
        dependencia_id: 2,
        estado: 'Activo',
        createdAt:  new Date(),
        updatedAt:  new Date()
      });
    });

    await queryInterface.bulkInsert('usuarios', usuarios, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('usuarios', null, {});
    
  }
};
