// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { ModelStatic } from "sequelize";
import { Model } from "sequelize-typescript";

/**
 * Throws BadRequest (400) error if given number is NaN
 * @param id Id to check
 */
export async function checkIdIsNotNaN(id: number | string) {
    if (typeof id === "string") {
        id = parseInt(id);
    }
    if (Number.isNaN(id)) {
        throw createHttpError(400, "Given id is Not A Number");
    }
}

/**
 * Throws error if given item id does not exist or isn't valid
 * @param id Role id to check
 */
export async function checkExistingId<M extends Model>(
    id: number | string,
    model: ModelStatic<M>,
) {
    // Check is id is a number
    return checkIdIsNotNaN(id)
        .then(() =>
            // Check if requested role id exist in database
            model.findByPk(id),
        )
        .then(async (existingPoste) => {
            if (existingPoste === null) {
                throw createHttpError(404, "Wrong id or item doesn't exist");
            }
        });
}

/**
 * Generic error handler for controllers
 * @param err Error to handle
 * @param res : Error status and message, 500 by default
 */
export async function controllerErrorHandler(err: HttpError, res: Response) {
    console.error(err);
    if (err.status === undefined) {
        err.status = 500;
    }
    if (err.message === undefined) {
        err.message = "Unknown error";
    }
    return res.status(err.status).json({
        status: err.status,
        message: err.message,
    });
}
