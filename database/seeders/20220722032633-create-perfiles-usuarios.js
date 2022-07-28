'use strict';

const {Usuarios, Perfiles} = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    let perfiles_usuarios = [];
    const usuarios = await Usuarios.findAll();
    const perfiles = await Perfiles.findAll();
    usuarios.forEach(user => {

      perfiles_usuarios.push({
        usuario_id: user.id,
        perfil_id: perfiles[0].id,
        estado: 'Activo'
      });
    });

    await queryInterface.bulkInsert('perfiles_usuarios', perfiles_usuarios, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('perfiles_usuarios', null, {});
  }
};
