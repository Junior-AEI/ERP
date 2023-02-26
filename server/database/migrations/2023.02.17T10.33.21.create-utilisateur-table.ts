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
            field: "nom",
        },
        description: {
            type: DataType.STRING,
            field: "description",
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
            field: "nomUtilisateur",
        },
        motDePasse: {
            type: DataType.STRING,
            allowNull: false,
            field: "motDePasse",
        },
        derniereConnexion: {
            type: DataType.DATE,
            field: "derniereConnexion",
        },
        estActif: {
            type: DataType.BOOLEAN,
            allowNull: false,
            field: "estActif",
        },
        debutMandat: {
            type: DataType.DATE,
            allowNull: false,
            field: "debutMandat",
        },
        finMandat: {
            type: DataType.DATE,
            allowNull: false,
            field: "finMandat",
        },
        mailJE: {
            type: DataType.STRING,
            allowNull: false,
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
            field: "createdAt",
        },
        updatedAt: {
            type: DataType.DATE,
            field: "updatedAt",
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Utilisateur");
    await sequelize.getQueryInterface().dropTable("Poste");
};
