'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {

    // Relationships
    static associate(models) {
      Usuarios.belongsTo(models.Personas, { as: 'datosPersonales', foreignKey: 'persona_id' });
      Usuarios.hasMany(models.Perfiles_Usuarios, { as: 'perfilesUsuario', foreignKey: 'usuario_id' });
    }
  }

  Usuarios.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password:       DataTypes.STRING,
    persona_id:     DataTypes.INTEGER,
    dependencia_id: DataTypes.INTEGER,
    estado:         DataTypes.STRING,
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
    tableName: 'usuarios'
  });
  return Usuarios;
};