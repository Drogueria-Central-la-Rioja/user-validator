'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {}
  Usuarios.init({
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    idPersona: DataTypes.INTEGER,
    idDependencia: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};