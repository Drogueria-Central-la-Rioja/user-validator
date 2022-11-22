'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Personas.hasOne(models.Usuarios, { as: 'login', foreignKey: 'persona_id' });
      Personas.belongsTo(models.Domicilios, { as: 'domicilioPersona', foreignKey: 'domicilio_id' });
    }
  }
  Personas.init({
    nombres:      DataTypes.STRING,
    apellidos:    DataTypes.STRING,
    dni:          DataTypes.NUMBER,
    email:        DataTypes.STRING,
    telefono:     DataTypes.STRING,
    domicilio_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Personas',
    tableName: 'personas'
  });
  return Personas;
};