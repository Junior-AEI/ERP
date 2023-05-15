// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import type { Migration } from "../../src/migrations/umzug";
import { DataType } from "sequelize-typescript";
import validator from "validator";
export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Adherents", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "id",
        },
        nom: {
            type: DataType.STRING,
            allowNull: false,
            field: "nom",
        },
        prenom: {
            type: DataType.STRING,
            allowNull: false,
            field: "prenom",
        },
        sexe: {
            type: DataType.ENUM,
            values: ["F", "M", "O"],
            allowNull: false,
            validate: { isIn: [["F", "M", "O"]] },
            field: "sexe",
        },
        telephoneMobile: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkPhone(str: string) {
                    if (!validator.isMobilePhone(str)) {
                        throw new Error("Invalid phone number");
                    }
                },
            },
            field: "telephoneMobile",
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: { isEmail: true },
            field: "email",
        },
        dateNaissance: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true, notEmpty: true },
            field: "dateNaissance",
        },
        lieuNaissance: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            field: "lieuNaissance",
        },
        nationalite: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                checkCountry(str: string) {
                    if (!validator.isISO31661Alpha3(str)) {
                        throw new Error("Invalid country code");
                    }
                },
            },
            field: "nationalite",
        },
        promotion: {
            type: DataType.STRING,
            allowNull: false,
            validate: { min: 1920, max: 9999, isNumeric: true },
            field: "promotion",
        },
        dateCotisation: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "dateCotisation",
        },
        moyenPaiement: {
            type: DataType.ENUM,
            values: ["Esp", "CB", "Vir", "Lydia"],
            validate: { isIn: [["Esp", "CB", "Vir", "Lydia"]] },
            field: "moyenPaiement",
        },
        filiere: {
            type: DataType.ENUM,
            allowNull: false,
            values: ["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"],
            validate: {
                isIn: [["Info", "Elec", "Telecom", "Matmeca", "R&I", "SEE"]],
            },
            field: "filiere",
        },
        adresseId: {
            type: DataType.INTEGER,
            allowNull: false,
            field: "adresseId",
            references: { model: "Adresses", key: "id" },
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "createdAt",
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            validate: { isDate: true },
            field: "updatedAt",
        },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Adherents");
};
