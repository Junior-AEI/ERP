import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";
export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Entreprises", {
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
        entiteJuridique: {
            type: DataType.STRING,
            allowNull: false,
            field: "entiteJuridique",
        },
        adresseId: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "adresseId",
            references: { model: "Adresses", key: "id" },
            onDelete: "NO ACTION",
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
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Entreprises");
};
