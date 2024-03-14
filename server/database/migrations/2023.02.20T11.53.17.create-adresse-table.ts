// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Migration } from '../../src/migrations/umzug'
import { DataType } from 'sequelize-typescript'
import validator from 'validator'

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('Adresses', {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        adresse: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: 'adresse'
        },
        complementAdresse: {
            type: DataType.STRING,
            field: 'complementAdresse'
        },
        ville: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: 'ville'
        },
        codePostal: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkPostalCode(pc: string) {
                    if (!validator.isPostalCode(pc, 'any')) {
                        throw new Error('Invalid postal code !')
                    }
                },
                notEmpty: true
            },
            field: 'codePostal'
        },
        pays: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkCountry(c: string) {
                    if (!validator.isISO31661Alpha3(c)) {
                        throw new Error('Invalid country code')
                    }
                },
                notEmpty: true
            },
            field: 'pays'
        },
        createdAt: {
            type: DataType.DATE,
            validate: { isDate: true },
            field: 'createdAt'
        },
        updatedAt: {
            type: DataType.DATE,
            validate: { isDate: true },
            field: 'updatedAt'
        }
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Adresses')
}
