import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Postes", {
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
        description: {
            type: DataType.TEXT,
            field: "description",
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
    await sequelize.getQueryInterface().createTable("Utilisateurs", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        nomUtilisateur: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
            field: "nomUtilisateur",
        },
        motDePasse: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: "motDePasse",
        },
        derniereConnexion: {
            type: DataType.DATE,
            validate: { isDate: true },
            field: "derniereConnexion",
        },
        estActif: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: { isBoolean: true, notEmpty: true },
            field: "estActif",
        },
        debutMandat: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true, notEmpty: true },
            field: "debutMandat",
        },
        finMandat: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true, notEmpty: true },
            field: "finMandat",
        },
        mailJE: {
            type: DataType.STRING,
            allowNull: false,
            validate: { isEmail: true },
            field: "mailJE",
        },
        posteId: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "posteId",
            references: { model: "Postes", key: "id" },
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
    await sequelize.getQueryInterface().dropTable("Utilisateurs");
    await sequelize.getQueryInterface().dropTable("Postes");
};
