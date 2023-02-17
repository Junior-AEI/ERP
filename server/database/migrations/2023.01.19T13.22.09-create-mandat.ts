import type { Migration } from "../../src/migrations/umzug";
import { DataTypes } from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("Mandats", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dateDebut: {
      type: DataTypes.DATEONLY,
    },
    dateFin: {
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
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("Mandats");
};
