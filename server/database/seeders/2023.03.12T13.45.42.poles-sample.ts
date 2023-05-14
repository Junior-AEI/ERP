import type { Seeder } from "../../src/migrations/umzug";

const polesSamples = [
    {
        nom: "Bureau",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Suivie d'Étude",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Développement Commercial",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Communication",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Trésorerie",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Qualité",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Systèmes d'Information",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert("Poles", polesSamples);
    await sequelize.getQueryInterface().bulkUpdate(
        "Postes",
        {
            nomPole: "Bureau",
        },
        {
            nom: [
                "Président⋅e",
                "Vice Président⋅e",
                "Trésorier⋅ère",
                "Secrétaire Général",
            ],
        }
    );
};
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkUpdate(
        "Postes",
        {
            nomPole: null,
        },
        {
            nom: [
                "Président⋅e",
                "Vice Président⋅e",
                "Trésorier⋅ère",
                "Secrétaire Général",
            ],
        }
    );
    await sequelize.getQueryInterface().bulkDelete("Poles", {
        nom: polesSamples.map((pole) => pole.nom),
    });
};
