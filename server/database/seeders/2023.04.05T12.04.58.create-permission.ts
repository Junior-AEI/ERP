import type { Seeder } from "../../src/migrations/umzug";

const permissions = [
    {
        nomPermission: "createAdherent",
        typePermission: "write",
        idUtilisateur: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert("Permissions", permissions);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Permission", {
        nomPermission: permissions.map((perm) => perm.nomPermission),
    });
};
