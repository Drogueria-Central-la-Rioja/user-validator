'use strict';

const { encryptData } = require('../../api/Utils/encryption');
const { Personas, Dependencias } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let usuarios = [];
    const personas = await Personas.findAll({limit:5});
    const dependencias = await Dependencias.findAll({limit:5});
    const pass = await encryptData('123');
    personas.forEach((persona) => {
      usuarios.push({
        username:   'admin',
        password:   pass,
        persona_id: persona.id,
        dependencia_id: dependencias[0].id,
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
