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
    HasMany,
    PrimaryKey,
    IsIn,
} from 'sequelize-typescript'
import Document from './document.model'

const TYPE = [""]

@Table
export default class DocumentType extends Model {
    @PrimaryKey
    @IsIn([TYPE])
    @Column({
        type: DataType.ENUM,
        values: TYPE,
        allowNull: false,
        primaryKey: true,
    })
    type!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fieldNumber!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    fieldMeaning!: string

    @HasMany(() => Document)
    document!: Document
}
