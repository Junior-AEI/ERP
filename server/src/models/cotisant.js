"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cotisant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cotisant.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      sexe: DataTypes.STRING,
      telMobile: DataTypes.STRING,
      email: DataTypes.STRING,
      dateNaissance: DataTypes.DATEONLY,
      lieuNaissance: DataTypes.STRING,
      nationalite: DataTypes.STRING,
      promotion: DataTypes.STRING,
      dateCotisation: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Cotisant",
    }
  );
  return Cotisant;
};
