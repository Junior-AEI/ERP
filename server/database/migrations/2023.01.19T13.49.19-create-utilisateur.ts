import type { Migration } from '../../src/migrations/umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("Utilisateurs", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nomUtilisateur: {
      type: DataTypes.STRING,
    },
    estActive: {
      type: DataTypes.BOOLEAN,
    },
    derniereConnexion: {
      type: DataTypes.DATE,
    },
    motDePasse: {
      type: DataTypes.STRING,
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
  await sequelize.getQueryInterface().dropTable("Utilisateurs");
}
