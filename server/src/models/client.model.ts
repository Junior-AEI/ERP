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
    IsEmail,
} from "sequelize-typescript";
import validator from "validator";
import Entreprise from "./entreprise.model";

const GENDER = ["F", "M", "O"];

@Table
export default class Client extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nom!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    prenom!: string;

    @IsIn([GENDER])
    @Column({
        type: DataType.ENUM,
        values: GENDER,
        allowNull: false,
    })
    sexe!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPhone(str: string) {
                if (!validator.isMobilePhone(str)) {
                    throw new Error("Invalid phone number");
                }
            },
        },
    })
    telephoneMobile!: string;

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fonction!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkPhone(str: string) {
                if (!validator.isMobilePhone(str)) {
                    throw new Error("Invalid phone number");
                }
            },
        },
    })
    telephoneFixe!: string;

    @ForeignKey(() => Entreprise)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    entrepriseId!: number;

    @BelongsTo(() => Entreprise)
    entreprise!: Entreprise;

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}
