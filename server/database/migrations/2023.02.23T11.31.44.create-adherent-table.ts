import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";
import validator from "validator";
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
        dateNaissance: {
            type: DataType.DATEONLY,
            validate: { isDate: true },
            field: "dateNaissance",
        },
        lieuNaissance: {
            type: DataType.STRING,
            validate: { notEmpty: true },
            field: "lieuNaissance",
        },
        nationalite: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkCountry(str: string) {
                    if (!validator.isISO31661Alpha3(str)) {
                        throw new Error("Invalid country code");
                    }
                },
            },
            field: "nationalite",
        },
        promotion: {
            type: DataType.STRING,
            allowNull: false,
            validate: { min: 1920, max: 9999, isNumeric: true },
            field: "promotion",
        },
        dateCotisation: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "dateCotisation",
        },
        moyenPaiement: {
            type: DataType.ENUM,
            values: ["Esp", "CB", "Vir", "Lydia"],
            validate: { isIn: [["Esp", "CB", "Vir", "Lydia"]] },
            field: "moyenPaiement",
        },
        filiere: {
            type: DataType.ENUM,
            allowNull: false,
            values: ["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"],
            validate: {
                isIn: [["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"]],
            },
            field: "filiere",
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
    await sequelize.getQueryInterface().dropTable("Adherents");
};
