import type { Seeder } from "../../src/migrations/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Cotisants", {});
    await sequelize.getQueryInterface().bulkInsert("Cotisants", [
        {
            nom: "De Riv",
            prenom: "Geralt",
            sexe: "M",
            telMobile: "00 11 22 33 44",
            email: "geralt.de_riv@gmail.tem",
            dateNaissance: new Date(),
            lieuNaissance: "Kaedwen",
            nationalite: "Temeri",
            promotion: "100-300",
            dateCotisation: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Cotisants", {});
};
