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
    Unique,
    PrimaryKey,
    HasMany,
} from "sequelize-typescript";
import Poste from "./poste.model";
import Adherent from "./member.model";
import Permission from "./permission.model";

@Table
export default class Utilisateur extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @NotEmpty
    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nomUtilisateur!: string;

    @NotEmpty
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    motDePasse!: string;

    @IsDate
    @Column({
        type: DataType.DATE,
    })
    derniereConnexion!: Date;

    @NotEmpty
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        validate: {
            isBoolean: true,
        },
    })
    estActif!: boolean;

    @NotEmpty
    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    debutMandat!: Date;

    @NotEmpty
    @IsDate
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    finMandat!: Date;

    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    mailJE!: string;

    @ForeignKey(() => Poste)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    posteId!: number;

    @BelongsTo(() => Poste)
    poste!: Poste;

    @ForeignKey(() => Adherent)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    adherentId!: number;

    @BelongsTo(() => Adherent)
    adherent!: Adherent;

    @HasMany(() => Permission)
    permissions!: Permission[];

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
