import type { Seeder } from "../../src/migrations/umzug";
import { Poste } from "../../src/models/poste.model";
const utilistateurSamples = [
  {
    id: 1,
    nomUtilisateur: "lorene.marques",
    motDePasse: "unmotdepassesuperfort",
    derniereConnexion: new Date(0),
    estActif: true,
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
    posteId: 4,
    mailJE: "tristan.le-meur@junior-aei.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkInsert("Utilisateurs", utilistateurSamples);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("Utilisateurs", { id: utilistateurSamples.map((u) => u.id) });
};
