import type { Seeder } from "../../src/migrations/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Adresses", {});
  await sequelize.getQueryInterface().bulkInsert("Adresses", [
    {
      adresse: "66 rue de la paix",
      complementAdresse: "apt. 10",
      codePostal: 33333,
      pays: "France",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Adresses", {});
};
