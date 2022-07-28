'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfiles extends Model {

    // Relationships
    static associate(models) {
      Perfiles.hasMany(models.Perfiles_Usuarios, { as: 'usuariosPerfil', foreignKey: 'perfil_id' });
    }
  }

  Perfiles.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perfiles',
    tableName: 'perfiles',
    timestamps: false
  });
  return Perfiles;
};