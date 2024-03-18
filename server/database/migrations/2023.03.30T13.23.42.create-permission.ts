// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Migration } from '../../src/migrations/umzug'
import { DataType } from 'sequelize-typescript'

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('Permissions', {
        nomPermission: {
            type: DataType.STRING,
            allowNull: false,
            primaryKey: true,
            field: 'nomPermission'
        },
        typePermission: {
            type: DataType.ENUM,
            values: ['read', 'write'],
            allowNull: false,
            validate: { isIn: [['read', 'write']] },
            field: 'typePermission'
        },
        idUtilisateur: {
            type: DataType.INTEGER,
            allowNull: false,
            field: 'idUtilisateur',
            references: { model: 'Utilisateurs', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: 'createdAt'
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: 'updatedAt'
        }
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Permissions')
}
