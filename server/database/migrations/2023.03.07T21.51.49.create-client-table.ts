import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";
import validator from "validator";
export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Clients", {
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
            type: DataType.ENUM,
            values: ["F", "M", "O"],
            allowNull: false,
            validate: { isIn: [["F", "M", "O"]] },
            field: "sexe",
        },
        telephoneMobile: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkPhone(str: string) {
                    if (!validator.isMobilePhone(str)) {
                        throw new Error("Invalid phone number");
                    }
                },
            },
            field: "telephoneMobile",
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: { isEmail: true },
            field: "email",
        },
        fonction: {
            type: DataType.STRING,
            allowNull: false,
            field: "fonction",
        },
        telephoneFixe: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkPhone(str: string) {
                    if (!validator.isMobilePhone(str)) {
                        throw new Error("Invalid phone number");
                    }
                },
            },
            field: "telephoneFixe",
        },
        entrepriseId: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "entrepriseId",
            references: { model: "Entreprises", key: "id" },
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
    await sequelize.getQueryInterface().dropTable("Clients");
};
