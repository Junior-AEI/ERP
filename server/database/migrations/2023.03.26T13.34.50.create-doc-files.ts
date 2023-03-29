import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Fichiers", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        chemin: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: "chemin",
        },
        documentId: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "documentId",
            references: { model: "Documents", key: "id" },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "createdAt",
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "updatedAt",
        },
    });
    await sequelize.getQueryInterface().createTable("Documents", {
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
            validate: { notEmpty: true },
            field: "nom",
        },
        statut: {
            type: DataType.ENUM,
            values: ["À relire", "À modifier", "Validé", "Signé"],
            allowNull: false,
            validate: { isIn: [["À relire", "À modifier", "Validé", "Signé"]] },
            field: "statut",
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "createdAt",
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "updatedAt",
        },
    });
};
export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Documents");
    await sequelize.getQueryInterface().dropTable("Fichiers");
};
