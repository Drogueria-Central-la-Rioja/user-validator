'use strict';

const { Domicilios } = require('../../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const domicilio = await Domicilios.findOne({where: { descripcion: 'Casa paterna'}});
      await queryInterface.bulkInsert('personas', [
        {nombres: "Juan Carlos", apellidos: "Perez", dni: 324324345, email: "juancito@gmial.com", telefono: "3804-392932", domicilio_id: domicilio.id, createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkDelete('personas', null, {});
  }
};
