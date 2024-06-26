// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, NotEmpty, PrimaryKey, IsDate, HasMany, HasOne } from 'sequelize-typescript'
import validator from 'validator'
import Members from './member.model'
import Companies from './company.model'

@Table
export default class Addresses extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    addressId!: number

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    address!: string

    @Column({
        type: DataType.STRING
    })
    additionnalAddress!: string //complément d'adresse

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    city!: string

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPostalCode(pc: string) {
                if (!validator.isPostalCode(pc, 'any')) {
                    throw new Error('Invalid postal code !')
                }
            }
        }
    })
    postCode!: string

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkCountry(c: string) {
                if (!validator.isISO31661Alpha3(c)) {
                    throw new Error('Invalid country code')
                }
            }
        }
    })
    country!: string

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    createdAt!: Date

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE
    })
    updatedAt!: Date

    @HasMany(() => Members)
    member!: Members

    @HasOne(() => Companies)
    company!: Companies
}
