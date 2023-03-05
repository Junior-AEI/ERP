import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";
import { Adresse } from "../../src/models/adresse.model";
import validator from "validator";

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
            validate: { notEmpty: true },
            field: "adresse",
        },
        complementAdresse: {
            type: DataType.STRING,
            field: "complementAdresse",
        },
        ville: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: "ville",
        },
        codePostal: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkPostalCode(pc: string) {
                    if (!validator.isPostalCode(pc, "any")) {
                        throw new Error("Invalid postal code !");
                    }
                },
                notEmpty: true,
            },
            field: "codePostal",
        },
        pays: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkCountry(c: string) {
                    if (!validator.isISO31661Alpha3(c)) {
                        throw new Error("Invalid country code");
                    }
                },
                notEmpty: true,
            },
            field: "pays",
        },
        createdAt: {
            type: DataType.DATE,
            validate: { isDate: true },
            field: "createdAt",
        },
        updatedAt: {
            type: DataType.DATE,
            validate: { isDate: true },
            field: "updatedAt",
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Adresses");
};
