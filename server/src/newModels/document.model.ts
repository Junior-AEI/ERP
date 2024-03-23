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
    CreatedAt,
    ForeignKey,
    BelongsTo,
    IsDate,
    NotEmpty,
    PrimaryKey
} from 'sequelize-typescript'
import User from './user.model'
import DocumentType from './documentType.model'

@Table
export default class Document extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    documentId!: number

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    path!: string

    @NotEmpty
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    version!: number
    
    @ForeignKey(() => DocumentType)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    DocumentType!: string

    @BelongsTo(() => DocumentType)
    documentType!: DocumentType

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    information!: string

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    status!: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    authorId!: number

    @BelongsTo(() => User)
    user!: User

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date
}
