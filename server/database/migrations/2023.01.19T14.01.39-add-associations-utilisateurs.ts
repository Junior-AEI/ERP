import type { Migration } from "../../src/migrations/umzug";
import { DataTypes } from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .addColumn("Utilisateurs", "idCotisant", {
            type: DataTypes.INTEGER,
            references: {
                model: "Cotisants",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .removeColumn("Utilisateurs", "idCotisant");
};
