// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
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
