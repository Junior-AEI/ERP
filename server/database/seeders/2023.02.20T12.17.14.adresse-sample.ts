import type { Seeder } from "../../src/migrations/umzug";

const adresses = [
  {
    id: 1,
    adresse: "999 rue des cerberes",
    complementAdresse: "appt. 2",
    ville: "Enfer",
    codePostal: "66 666",
    pays: "Inaccessible",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    adresse: "222 rue des tulipes",
    complementAdresse: null,
    ville: "Paradis",
    codePostal: "11 111",
    pays: "Inaccessible",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("Adresse", adresses);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("Adresse", { id: adresses.map((p) => p.id) });
};
