import type { Seeder } from "../../src/migrations/umzug";

const postesSamples = [
  {
    id: 1,
    nom: "Président⋅e",
    description: `Représentant⋅e et responsable de la Junior-Entreprise`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nom: "Vice Président⋅e",
    description: `Vice-président⋅e de la Junior-entreprise. En charge des relations internes (RH) et/ou
          externes de la Junior-Entreprise`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    nom: "Trésorier⋅ère",
    description: `Personne responsable de la trésorerie de la Junior-Entreprise`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    nom: "Secrétaire Général",
    description: `Personne responsable de la gestion administrative de la Junior-Entreprise`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("Postes", postesSamples);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("Postes", { id: postesSamples.map((p) => p.id) });
};
