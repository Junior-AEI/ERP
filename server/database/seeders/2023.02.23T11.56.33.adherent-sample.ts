import type { Seeder } from "../../src/migrations/umzug";

const adherentSample = [
  {
    id: 1,
    nom: "Vovard",
    prenom: "Marine",
    sexe: "F",
    telephoneMobile: "+33234567034",
    email: "marine.vovard@bordeaux-inp.com",
    dateNaissance: new Date(),
    lieuNaissance: "Le Mans",
    nationalite: "FR",
    promotion: "2024",
    dateCotisation: new Date(),
    moyenPaiement: "Lydia",
    filiere: "Informatique",
    adresseId: 1,
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
    dateNaissance: new Date(),
    lieuNaissance: "Jsp",
    nationalite: "FR",
    promotion: "2024",
    dateCotisation: new Date(),
    moyenPaiement: "Lydia",
    filiere: "Informatique",
    adresseId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("Adherents", adherentSample);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("Adherents", { id: adherentSample.map((u) => u.id) });
};
