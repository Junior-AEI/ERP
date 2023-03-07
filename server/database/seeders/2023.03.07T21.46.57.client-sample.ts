import type { Seeder } from "../../src/migrations/umzug";

const clientSample = [
    {
        id: 1,
        nom: "Vovard",
        prenom: "Marine",
        sexe: "F",
        telephoneMobile: "+33234567034",
        email: "marine.vovard@bordeaux-inp.com",
        fonction: "chef de projet",
        telephoneFixe: "+33234567035",
        entrepriseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        nom: "Je",
        prenom: "Manque",
        sexe: "F",
        telephoneMobile: "+33234567034",
        email: "d'inspiration@bordeaux-inp.com",
        fonction: "PDG",
        telephoneFixe: "+33234567036",
        entrepriseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert("Clients", clientSample);
};
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .bulkDelete("Clients", { id: clientSample.map((u) => u.id) });
};
