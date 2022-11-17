'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Localidades.belongsTo(models.Departamentos, { as: 'departamento', foreignKey: 'departamento_id' });
    }
  }
  Localidades.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    departamento_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Localidades',
    tableName: 'localidades',
    timestamps: false
  });
  return Localidades;
};