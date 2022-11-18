'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dependencias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dependencias.belongsTo(models.Domicilios, { as: 'domicilioDependencia', foreignKey: 'domicilio_id' });
      Dependencias.belongsTo(models.Niveles_atencion, { as: 'nivelAtencion', foreignKey: 'nivel_atencion_id' });
    }
  }
  Dependencias.init({
    codigo: DataTypes.STRING,
    tipo: DataTypes.STRING,
    nombre_corto: DataTypes.STRING,
    nombre_oficial: DataTypes.STRING,
    efector_salud: DataTypes.BOOLEAN,
    codigo_sisa: DataTypes.STRING,
    cuit: DataTypes.INTEGER,
    codigo_remediar: DataTypes.STRING,
    domicilio_id: DataTypes.INTEGER,
    nivel_atencion_id: DataTypes.INTEGER,
    tipologia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dependencias',
    tableName: 'dependencias'
  });
  return Dependencias;
};