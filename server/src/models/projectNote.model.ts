// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, IsIn, IsDate, CreatedAt } from 'sequelize-typescript'
import Users from './user.model'
import Projects from './project.model'

const ADVANCEMENT = ['Prospection', 'Devis validé', 'CE signé', 'RM signé', 'FA émise', 'FA payée', 'FI émise', 'FI payée', 'FS émise', 'FS payée', 'PVRF signé', 'PVRI signé', 'ARM signé', 'ARCE signé', 'ARRM signé', 'ARCE signé', 'BV payé']

@Table
export default class ProjectNotes extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    noteId!: number

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    writerId!: number

    @BelongsTo(() => Users)
    user!: Users

    @ForeignKey(() => Projects)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    projectId!: number

    @BelongsTo(() => Projects)
    project!: Projects

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment!: string

    @IsIn([ADVANCEMENT])
    @Column({
        type: DataType.ENUM,
        values: ADVANCEMENT,
        allowNull: false
    })
    advancement!: string

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date
}
