'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens_blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tokens_blacklist.init({
    token: DataTypes.STRING,
    expireIn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tokens_blacklist',
    tableName: 'tokens_blacklists'
  });
  return Tokens_blacklist;
};