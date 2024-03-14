// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Seeder } from '../../src/migrations/umzug'

const postesSamples = [
    {
        id: 1,
        nom: 'Président⋅e',
        description: `Représentant⋅e et responsable de la Junior-Entreprise`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        nom: 'Vice Président⋅e',
        description: `Vice-président⋅e de la Junior-entreprise. En charge des relations internes (RH) et/ou
          externes de la Junior-Entreprise`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        nom: 'Trésorier⋅ère',
        description: `Personne responsable de la trésorerie de la Junior-Entreprise`,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        nom: 'Secrétaire Général',
        description: `Personne responsable de la gestion administrative de la Junior-Entreprise`,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert('Postes', postesSamples)
}
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('Postes', { id: postesSamples.map((p) => p.id) })
}
