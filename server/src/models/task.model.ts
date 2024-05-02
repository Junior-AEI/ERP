// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, IsDate, PrimaryKey, IsIn } from 'sequelize-typescript'
import Users from './user.model'

const STATE = ['A faire', 'En cours', 'Terminée', 'Annulé', 'Archivé']

@Table
export default class Tasks extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    taskId!: number

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number

    @BelongsTo(() => Users)
    user!: Users

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dueDate!: Date

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string

    @IsIn([STATE])
    @Column({
        type: DataType.ENUM,
        values: STATE,
        allowNull: false
    })
    state!: string

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    issuerId!: number
}
