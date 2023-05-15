// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Seeder } from "../../src/migrations/umzug";

const adherentSample = [
    {
        id: 1,
        nom: "Vovard",
        prenom: "Marine",
        sexe: "F",
        telephoneMobile: "+33756490998",
        email: "marine.vovard@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Le Mans",
        nationalite: "FRA",
        promotion: "2024",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Info",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        nom: "Marques",
        prenom: "Lorène",
        sexe: "F",
        telephoneMobile: "+33757137368",
        email: "lmarques@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Quelque part",
        nationalite: "FRA",
        promotion: "2024",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Elec",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        nom: "Bouhassoun",
        prenom: "Tahir",
        sexe: "M",
        telephoneMobile: "+33757131560",
        email: "tahir.bouhassoun@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Quelque part",
        nationalite: "FRA",
        promotion: "2024",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Matmeca",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        nom: "Zilliox",
        prenom: "Clement",
        sexe: "M",
        telephoneMobile: "+33757130799",
        email: "clement.zilliox@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Quelque part",
        nationalite: "FRA",
        promotion: "2024",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Matmeca",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        nom: "Le Meur",
        prenom: "Tristan",
        sexe: "M",
        telephoneMobile: "+33756492896",
        email: "tlemeur@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Quelque part",
        nationalite: "FRA",
        promotion: "2024",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Matmeca",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        nom: "Doe",
        prenom: "John",
        sexe: "M",
        telephoneMobile: "+33757130702",
        email: "johndoe@bordeaux-inp.com",
        dateNaissance: new Date(),
        lieuNaissance: "Quelque part",
        nationalite: "USA",
        promotion: "2025",
        dateCotisation: new Date(),
        moyenPaiement: "Lydia",
        filiere: "Matmeca",
        adresseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert("Adherents", adherentSample);
};
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize
        .getQueryInterface()
        .bulkDelete("Adherents", { id: adherentSample.map((u) => u.id) });
};
