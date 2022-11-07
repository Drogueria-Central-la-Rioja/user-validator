'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domicilios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Domicilios.init({
    descripcion: DataTypes.STRING,
    direccion_completa: DataTypes.STRING,
    provincia_id: DataTypes.INTEGER,
    departamento_id: DataTypes.INTEGER,
    localidad_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Domicilios',
    tableName: 'domicilios'
  });
  return Domicilios;
};