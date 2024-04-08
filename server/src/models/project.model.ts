// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, PrimaryKey, IsDate, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Clients from './client.model'
import Contributors from './contributor.model'
import ProjectManagers from './projectManager.model'
import ProjectNotes from './projectNote.model'

@Table
export default class Projects extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    projectId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    acronym!: number

    @ForeignKey(() => Clients)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    companyId!: number

    @BelongsTo(() => Clients)
    client!: Clients

    @IsDate
    @Column({
        type: DataType.DATE
    })
    startDate!: Date

    @IsDate
    @Column({
        type: DataType.DATE
    })
    endDate!: Date

    @HasMany(() => Contributors)
    contributor!: Contributors

    @HasMany(() => ProjectManagers)
    projectManager!: ProjectManagers

    @HasMany(() => ProjectNotes)
    projectNote!: ProjectNotes
}
