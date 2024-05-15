// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, HasMany, IsIn } from 'sequelize-typescript'
import Companies from './company.model'
import Persons from './person.model'
import Projects from './project.model'

export const FIRSTCONTACTS = ['Bouche à oreille', 'Soirée partenaire', 'Appel téléphonique', 'Site AEI', 'Congrès','Salon', 'RS', 'Autre']

@Table
export default class Clients extends Model {
    @PrimaryKey
    @ForeignKey(() => Persons)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clientId!: number

    @BelongsTo(() => Persons)
    person!: Persons

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    function!: string

    @IsIn([FIRSTCONTACTS])
    @Column({
        type: DataType.ENUM,
        values: FIRSTCONTACTS,
        allowNull: false
    })
    firstContact!: string

    @ForeignKey(() => Companies)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    companyId!: number

    @BelongsTo(() => Companies)
    address!: Companies

    @HasMany(() => Projects)
    project!: Projects
}
