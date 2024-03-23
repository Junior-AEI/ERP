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
    PrimaryKey,
    IsDate,
    HasMany,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript'
import Company from './company.model'
import Contributor from './contributor.model'
import ProjectManager from './projectManager.model'

@Table
export default class Project extends Model {
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
        allowNull: false,
    })
    acronym!: number
    
    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    companyId!: number

    @BelongsTo(() => Company)
    company!: Company

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
 
    @HasMany(() => Contributor)
    contributor!: Contributor

    @HasMany(() => ProjectManager)
    projectManager!: ProjectManager
}
