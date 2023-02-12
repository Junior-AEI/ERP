import type { Migration } from '../../src/migrations/umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("Cotisants", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
    sexe: {
      type: DataTypes.STRING,
    },
    telMobile: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dateNaissance: {
      type: DataTypes.DATEONLY,
    },
    lieuNaissance: {
      type: DataTypes.STRING,
    },
    nationalite: {
      type: DataTypes.STRING,
    },
    promotion: {
      type: DataTypes.STRING,
    },
    dateCotisation: {
      type: DataTypes.DATEONLY,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("Cotisants");
};
