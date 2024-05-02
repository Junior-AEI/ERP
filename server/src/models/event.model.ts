// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, PrimaryKey, IsDate, HasMany, IsIn } from 'sequelize-typescript'
import Partners from './partner.model'
import EventGroupConcerned from './eventGroupConcerned.model'

const EVENTTYPES = ['Congrès', 'Afterwork', 'Réunion', 'CA', 'RDI', 'Formation', 'RDV client', 'Audit', 'AG', 'Autre'];

@Table
export default class Events extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    eventId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    startDate!: Date

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    endDate!: Date

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    location!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string

    @IsIn([EVENTTYPES])
    @Column({
        type: DataType.ENUM,
        values: EVENTTYPES,
        allowNull: false,
    })
    eventTypeName!: string

    @HasMany(() => Partners)
    member!: Partners

    @HasMany(() => EventGroupConcerned)
    eventGroupConcerned!: EventGroupConcerned
}
