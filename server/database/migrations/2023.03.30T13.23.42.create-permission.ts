import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Permissions", {
        nomPermission: {
            type: DataType.STRING,
            allowNull: false,
            primaryKey: true,
            field: "nomPermission",
        },
        typePermission: {
            type: DataType.ENUM,
            values: ["read", "write"],
            allowNull: false,
            validate: { isIn: [["read", "write"]] },
            field: "typePermission",
        },
        idUtilisateur: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "idUtilisateur",
            references: { model: "Utilisateurs", key: "id" },
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
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Permissions");
};
