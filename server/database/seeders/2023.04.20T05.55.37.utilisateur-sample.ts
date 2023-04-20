import { hashSync } from "bcrypt";
import type { Seeder } from "../../src/migrations/umzug";

const utilisateurSamples = [
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
        adherentId: 3,
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
        adherentId: 4,
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
        adherentId: 5,
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
        adherentId: 6,
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    utilisateurSamples.forEach((user) => {
        user.motDePasse = hashSync(user.motDePasse, 10);
    });
    sequelize
        .getQueryInterface()
        .bulkInsert("Utilisateurs", utilisateurSamples);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete("Utilisateurs", {
        id: utilisateurSamples.map((u) => u.id),
    });
};
