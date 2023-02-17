import type { Seeder } from "../../src/migrations/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("Postes", [
    {
      id: 1,
      nom: "Président⋅e",
      description: `Président⋅e de la Junior-entreprise`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Postes", { id: 1 });
};
