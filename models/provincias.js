'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provincias.hasMany(models.Departamentos, { as: 'departamentos', foreignKey: 'provincia_id' });
    }
  }
  Provincias.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Provincias',
    tableName: 'provincias',
    timestamps: false,
  });
  return Provincias;
};