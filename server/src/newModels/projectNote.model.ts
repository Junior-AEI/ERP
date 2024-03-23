// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    IsIn,
    IsDate,
    CreatedAt,
} from 'sequelize-typescript'
import User from './user.model'
import Project from './project.model'

const ADVANCEMENT = [""]

@Table
export default class ProjectNote extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    noteId!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    writerId!: number

    @BelongsTo(() => User)
    user!: User

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    projectId!: number

    @BelongsTo(() => Project)
    project!: Project

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
