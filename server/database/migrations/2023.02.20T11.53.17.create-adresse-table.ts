import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Adresses", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        adresse: {
            type: DataType.STRING,
            allowNull: false,
            field: "adresse",
        },
        complementAdresse: {
            type: DataType.STRING,
            field: "complementAdresse",
        },
        ville: {
            type: DataType.STRING,
            allowNull: false,
            field: "ville",
        },
        codePostal: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "codePostal",
        },
        pays: {
            type: DataType.STRING,
            allowNull: false,
            field: "pays",
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
    await sequelize.getQueryInterface().dropTable("Adresses");
};
