'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Departamentos.belongsTo(models.Provincias, { as: 'provincia', foreignKey: 'provincia_id'});
      Departamentos.hasMany(models.Localidades, { as: 'localidades', foreignKey: 'departamento_id' });
    }
  }
  Departamentos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    provincia_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Departamentos',
    tableName: 'departamentos',
    timestamps: false,
  });
  return Departamentos;
};