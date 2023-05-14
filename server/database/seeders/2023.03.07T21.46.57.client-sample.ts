import type { Seeder } from "../../src/migrations/umzug";

const clientSample = [
    {
        id: 1,
        nom: "Dupont",
        prenom: "Marie",
        sexe: "F",
        telephoneMobile: "+33756492849",
        email: "marie.dupont@entreprise1.com",
        fonction: "Chef de projet",
        telephoneFixe: "+33756492849",
        entrepriseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        nom: "Neymar",
        prenom: "Jean",
        sexe: "F",
        telephoneMobile: "+33757130937",
        email: "jean.neymar@gmail.com",
        fonction: "PDG",
        telephoneFixe: "+33757132161",
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
