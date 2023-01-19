'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mandat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mandat.init({
    dateDebut: DataTypes.DATEONLY,
    dateFin: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Mandat',
  });
  return Mandat;
};