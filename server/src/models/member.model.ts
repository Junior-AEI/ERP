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
    IsIn,
    IsDate,
    NotEmpty,
    IsNumeric,
    Max,
    Min,
    HasOne,
    PrimaryKey,
    HasMany
} from 'sequelize-typescript'
import validator from 'validator'
import Addresses from './address.model'
import Persons from './person.model'
import Users from './user.model'
import Contributors from './contributor.model'

const PAYMENTS = ['Esp', 'CB', 'Vir', 'Lydia']
const DEPARTMENTS = ['Informatique', 'Electronique', 'Telecommunication', 'Matmeca', 'R&I', 'SEE']

@Table
export default class Members extends Model {
    @PrimaryKey
    @ForeignKey(() => Persons)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    memberId!: number

    @BelongsTo(() => Persons)
    person!: Persons

    @IsDate
    @NotEmpty
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    birthDate!: Date

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    birthPlace!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkCountry(str: string) {
                if (!validator.isISO31661Alpha3(str)) {
                    throw new Error('Invalid country code')
                }
            }
        }
    })
    nationality!: string

    @IsNumeric
    @Max(9999)
    @Min(1920)
    @Column({
        type: DataType.STRING(4),
        allowNull: false
    })
    promotion!: string

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    contributionDate!: Date

    @IsIn([PAYMENTS])
    @Column({
        type: DataType.ENUM,
        values: PAYMENTS
    })
    paymentMethod!: string

    @IsIn([DEPARTMENTS])
    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: DEPARTMENTS
    })
    department!: string

    @ForeignKey(() => Addresses)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    addressId!: number

    @BelongsTo(() => Addresses)
    address!: Addresses

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

    @HasOne(() => Users)
    user!: Users

    @HasMany(() => Contributors)
    contributor!: Contributors
}
