import type { Seeder } from '../../src/migrations/umzug';

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Mandats", {});
  await sequelize.getQueryInterface().bulkInsert("Mandats", [
    {
      dateDebut: new Date(10, 10, 2010),
      dateFin: new Date(10, 20, 2015),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Mandats", {});
}
