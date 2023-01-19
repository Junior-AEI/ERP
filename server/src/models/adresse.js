'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adresse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adresse.init({
    adresse: DataTypes.STRING,
    complementAdresse: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    pays: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Adresse',
  });
  return Adresse;
};