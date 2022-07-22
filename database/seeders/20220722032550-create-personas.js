'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('personas', [
        {nombres: "Juan Carlos", apellidos: "Perez", dni: 324324345, email: "juancito@gmial.com", telefono: "3804-392932", domicilio_completo: "La Rioja - Argentina", createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('personas', null, {});

    // Pasando Null como segundo argumento del DELETE, borra todos los registros de la tablla
    // Funciona como una clausula Where:
    // {
    //   nombre: "Arturo" // Borrara solo ese registro
    // }
     
  }
};
