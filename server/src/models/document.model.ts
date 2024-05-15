// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, CreatedAt, ForeignKey, BelongsTo, IsDate, NotEmpty, PrimaryKey, IsIn } from 'sequelize-typescript'
import Users from './user.model'
import DocumentTypes from './documentType.model'

export const STATUS = ['A relire', 'A corriger', 'Relu', 'Sans Relecture'] as const
export type Status = typeof STATUS[number]

@Table
export default class Documents extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    documentId!: number

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

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

    @ForeignKey(() => DocumentTypes)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    typeId!: number

    @BelongsTo(() => DocumentTypes)
    documentType!: DocumentTypes

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    information!: string

    @NotEmpty
    @IsIn([[...STATUS]])
    @Column({
        type: DataType.ENUM,
        values: STATUS,
        allowNull: false
    })
    status!: string

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    authorId!: number

    @BelongsTo(() => Users)
    user!: Users

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date
}
