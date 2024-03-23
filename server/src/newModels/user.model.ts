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
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    IsEmail,
    IsDate,
    NotEmpty,
    PrimaryKey
} from 'sequelize-typescript'
import Member from './member.model'

@Table
export default class User extends Model {
    @PrimaryKey
    @ForeignKey(() => Member)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    memberId!: number

    @BelongsTo(() => Member)
    member!: Member

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!: string

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    lastLogin!: Date

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    mandateStart!: Date

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    mandateEnd!: Date

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    emailJE!: string

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    createdAt!: Date

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    updatedAt!: Date
}
