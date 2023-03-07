import { hashSync } from "bcrypt";
import type { Seeder } from "../../src/migrations/umzug";
import { Utilisateur } from "../../src/models/utilisateur.model";

let utilistateurSamples = [
    {
        id: 1,
        nomUtilisateur: "lorene.marques",
        motDePasse: "unmotdepassesuperfort",
        derniereConnexion: new Date(0),
        estActif: true,
        debutMandat: "2022-04-01T00:00:00+01:00",
        finMandat: "2023-03-31T23:59:59+01:00",
        posteId: 1,
        mailJE: "lorene.marques@junior-aei.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        nomUtilisateur: "tahir.bouhassoun",
        motDePasse: "encoreunndpsuperfort",
        derniereConnexion: new Date(0),
        estActif: true,
        debutMandat: "2022-04-01T00:00:00+01:00",
        finMandat: "2023-03-31T23:59:59+01:00",
        posteId: 2,
        mailJE: "tahir.bouhassoun@junior-aei.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        nomUtilisateur: "clement.zilliox",
        motDePasse: "encoreunndpsuperfort",
        derniereConnexion: new Date(0),
        estActif: true,
        debutMandat: "2022-04-01T00:00:00+01:00",
        finMandat: "2023-03-31T23:59:59+01:00",
        posteId: 3,
        mailJE: "clement.zilliox@junior-aei.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        nomUtilisateur: "tristan.le-meur",
        motDePasse: "unmdp",
        derniereConnexion: new Date(0),
        estActif: true,
        debutMandat: "2022-04-01T00:00:00+01:00",
        finMandat: "2023-03-31T23:59:59+01:00",
        posteId: 4,
        mailJE: "tristan.le-meur@junior-aei.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    utilistateurSamples.forEach((user) => {
        user.motDePasse = hashSync(user.motDePasse, 10);
    });
    sequelize
        .getQueryInterface()
        .bulkInsert("Utilisateurs", utilistateurSamples);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Utilisateurs", {
        id: utilistateurSamples.map((u) => u.id),
    });
};
