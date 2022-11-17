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
      Domicilios.belongsTo(models.Localidades, { as: 'localidad', foreignKey: 'localidad_id' });
      Domicilios.belongsTo(models.Dependencias, { as: 'efector', foreignKey: 'domicilio_id' });
    }
  }
  Domicilios.init({
    descripcion: DataTypes.STRING,
    direccion_completa: DataTypes.STRING,
    localidad_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Domicilios',
    tableName: 'domicilios'
  });
  return Domicilios;
};