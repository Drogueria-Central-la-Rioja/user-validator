'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveles_atencion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Niveles_atencion.hasMany(models.Dependencias, { as: 'dependenciasPorNivelAtencion', foreignKey: 'nivel_atencion_id' });
    }
  }
  Niveles_atencion.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveles_atencion',
    tableName: 'niveles_atencion'
  });
  return Niveles_atencion;
};