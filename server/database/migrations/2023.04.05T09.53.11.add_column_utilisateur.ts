import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .addColumn("Utilisateurs", "adherentId", {
            type: DataType.INTEGER,
            allowNull: true,
            field: "adherentId",
            references: { model: "Adherents", key: "id" },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
};
export const down: Migration = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .removeColumn("Utilisateurs", "adherentId");
};
