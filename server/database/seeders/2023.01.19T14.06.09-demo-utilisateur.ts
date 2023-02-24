import type { Seeder } from "../../src/migrations/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Utilisateurs", {});
    await sequelize.getQueryInterface().bulkInsert("Utilisateurs", [
        {
            nomUtilisateur: "gege2riv",
            estActive: false,
            derniereConnexion: new Date(),
            motDePasse: "Ciri",
            // idCotisant: 1, Ne fonctionne pas pour le moment
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Utilisateurs", {});
};
