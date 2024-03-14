// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Seeder } from '../../src/migrations/umzug'

const adresses = [
    {
        id: 1,
        adresse: '999 rue des cerberes',
        complementAdresse: 'appt. 2',
        ville: 'Enfer',
        codePostal: '66 666',
        pays: 'FRA',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        adresse: '222 rue des tulipes',
        complementAdresse: null,
        ville: 'Paradis',
        codePostal: '11 111',
        pays: 'FRA',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert('Adresses', adresses)
}
export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('Adresses', { id: adresses.map((p) => p.id) })
}
