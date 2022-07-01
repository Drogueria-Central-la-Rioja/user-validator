'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfiles_Usuarios extends Model {}
  Perfiles_Usuarios.init({
    usuarioID: DataTypes.INTEGER,
    perfilID: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perfiles_Usuarios',
    timestamps: false
  });
  return Perfiles_Usuarios;
};