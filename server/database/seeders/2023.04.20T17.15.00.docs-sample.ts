import type { Seeder } from "../../src/migrations/umzug";

const filesSamples = [
    {
        id: 3,
        chemin: "database/documents/16945e637fb0e5f4bed17c60659253663b34ca2970071b5603c615a35a5a5455.pdf",
        documentId: 1,
        statut: "À relire",
        createdAt: new Date("2023-03-01"),
        updatedAt: new Date("2023-03-15"),
    },
    {
        id: 1,
        chemin: "database/documents/be7fd15fc21fa73b29efce564ec6b5935cac14b92e5402f06ae22c0c0316f1cb.pdf",
        documentId: 1,
        statut: "Validé",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-15"),
    },
    {
        id: 0,
        chemin: "database/documents/be7fd15fc21fa73b29efce564ec6b5935cac14b92e5402f06ae22c0c0316f1cb.pdf",
        documentId: 2,
        statut: "Validé",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-15"),
    },
];
const documentSamples = [
    {
        id: 1,
        nom: "Doc Test 1",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-02-15"),
    },
    {
        id: 2,
        nom: "Doc Test 2",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-03-15"),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Documents", {
        id: documentSamples.map((d) => d.id),
    });
    await sequelize
        .getQueryInterface()
        .bulkInsert("Documents", documentSamples);
    await sequelize.getQueryInterface().bulkInsert("Fichiers", filesSamples);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Documents", {
        id: documentSamples.map((d) => d.id),
    });
    await sequelize.getQueryInterface().bulkDelete("Fichiers", {
        id: documentSamples.map((f) => f.id),
    });
};
