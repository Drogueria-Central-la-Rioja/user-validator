'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfiles_Usuarios extends Model {
    
    // Relationships
    static associate(models) {
      Perfiles_Usuarios.belongsTo(models.Usuarios, { as: 'usuarioPerfil', foreignKey: 'usuario_id' });
      Perfiles_Usuarios.belongsTo(models.Perfiles, { as: 'perfilAsignado', foreignKey: 'perfil_id' });
    }
  }

  Perfiles_Usuarios.init({
    usuario_id: DataTypes.INTEGER,
    perfil_id: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perfiles_Usuarios',
    tableName: 'perfiles_usuarios',
    timestamps: false
  });
  return Perfiles_Usuarios;
};