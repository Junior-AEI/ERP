import type { Seeder } from "../../src/migrations/umzug";

const entrepriseSample = [
    {
        id: 1,
        nom: "Entreprise 1",
        entiteJuridique: "Sarl",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        nom: "Entreprise 2",
        entiteJuridique: "SA",
        adresseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .bulkInsert("Entreprises", entrepriseSample);
};
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .bulkDelete("Entreprises", { id: entrepriseSample.map((u) => u.id) });
};
