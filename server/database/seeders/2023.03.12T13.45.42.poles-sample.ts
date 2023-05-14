// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Seeder } from "../../src/migrations/umzug";

const polesSamples = [
    {
        nom: "Bureau",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Suivie d'Étude",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Développement Commercial",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Communication",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Trésorerie",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Qualité",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nom: "Systèmes d'Information",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert("Poles", polesSamples);
    await sequelize.getQueryInterface().bulkUpdate(
        "Postes",
        {
            nomPole: "Bureau",
        },
        {
            nom: [
                "Président⋅e",
                "Vice Président⋅e",
                "Trésorier⋅ère",
                "Secrétaire Général",
            ],
        }
    );
};
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkUpdate(
        "Postes",
        {
            nomPole: null,
        },
        {
            nom: [
                "Président⋅e",
                "Vice Président⋅e",
                "Trésorier⋅ère",
                "Secrétaire Général",
            ],
        }
    );
    await sequelize.getQueryInterface().bulkDelete("Poles", {
        nom: polesSamples.map((pole) => pole.nom),
    });
};
