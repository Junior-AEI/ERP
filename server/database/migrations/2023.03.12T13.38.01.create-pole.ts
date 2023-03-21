import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Poles", {
        nom: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            primaryKey: true,
            field: "nom",
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
    await sequelize.getQueryInterface().addColumn("Postes", "nomPole", {
        type: DataType.STRING,
        allowNull: true,
        field: "nomPole",
        references: { model: "Poles", key: "nom" },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    });
};
export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Poles");
    await sequelize.getQueryInterface().removeColumn("Postes", "nomPole");
};
