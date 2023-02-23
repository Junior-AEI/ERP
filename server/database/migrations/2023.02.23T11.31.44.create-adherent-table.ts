import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("Adherents", {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    nom: {
      type: DataType.STRING,
      allowNull: false,
      field: "nom",
    },
    prenom: {
      type: DataType.STRING,
      allowNull: false,
      field: "prenom",
    },
    sexe: {
      type: DataType.STRING(1),
      allowNull: false,
      field: "sexe",
    },
    telephoneMobile: {
      type: DataType.STRING,
      allowNull: false,
      field: "telephoneMobile",
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      field: "email",
    },
    dateNaissance: {
      type: DataType.DATEONLY,
      field: "dateNaissance",
    },
    lieuNaissance: {
      type: DataType.STRING,
      field: "lieuNaissance",
    },
    nationalite: {
      type: DataType.STRING,
      field: "nationalite",
    },
    promotion: {
      type: DataType.STRING(4),
      field: "promotion",
    },
    dateCotisation: {
      type: DataType.DATE,
      field: "dateCotisation",
    },
    moyenPaiement: {
      type: DataType.STRING,
      field: "moyenPaiement",
    },
    filiere: {
      type: DataType.STRING,
      field: "filiere",
    },
    adresseId: {
      type: DataType.INTEGER,
      // allowNull: false,
      field: "adresseId",
      references: { model: "Adresses", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataType.DATE,
      field: "createdAt",
    },
    updatedAt: {
      type: DataType.DATE,
      field: "updatedAt",
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("Adherents");
};
