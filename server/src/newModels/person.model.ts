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
    PrimaryKey,
    IsIn,
    IsDate,
    IsEmail,
    HasOne
} from 'sequelize-typescript'
import validator from 'validator'
import Member from './member.model'
import Client from './client.model'

const GENDER = ['F', 'M', 'O']

@Table
export default class Person extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    personId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastname!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstname!: string

    @IsIn([GENDER])
    @Column({
        type: DataType.ENUM,
        values: GENDER,
        allowNull: false
    })
    gender!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPhone(str: string) {
                if (!validator.isMobilePhone(str)) {
                    throw new Error('Invalid phone number')
                }
            }
        }
    })
    mobilePhone!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            checkPhone(str: string) {
                if (!validator.isMobilePhone(str)) {
                    throw new Error('Invalid phone number')
                }
            }
        }
    })
    landlinePhone!: string

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string

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

    @HasOne(() => Member)
    member!: Member

    @HasOne(() => Client)
    client!: Client
}
