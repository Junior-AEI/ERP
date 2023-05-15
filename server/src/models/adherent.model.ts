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
    NotEmpty,
    IsNumeric,
    Max,
    Min,
    HasOne,
} from "sequelize-typescript";
import validator from "validator";
import Adresse from "./adresse.model";
import Utilisateur from "./utilisateur.model";

const GENDER = ["F", "M", "O"];
const PAYMENTS = ["Esp", "CB", "Vir", "Lydia"];
const COURSES = ["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"];

@Table
export default class Adherent extends Model {
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

    @IsDate
    @NotEmpty
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateNaissance!: Date;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lieuNaissance!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            checkCountry(str: string) {
                if (!validator.isISO31661Alpha3(str)) {
                    throw new Error("Invalid country code");
                }
            },
        },
    })
    nationalite!: string;

    @IsNumeric
    @Max(9999)
    @Min(1920)
    @Column({
        type: DataType.STRING(4),
        allowNull: false,
    })
    promotion!: string;

    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateCotisation!: Date;

    @IsIn([PAYMENTS])
    @Column({
        type: DataType.ENUM,
        values: PAYMENTS,
    })
    moyenPaiement!: string;

    @IsIn([COURSES])
    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: COURSES,
    })
    filiere!: string;

    @ForeignKey(() => Adresse)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    adresseId!: number;

    @BelongsTo(() => Adresse)
    adresse!: Adresse;

    @IsDate
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @HasOne(() => Utilisateur)
    utilisateur!: Utilisateur;

    @IsDate
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}
