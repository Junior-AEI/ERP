import { Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { ModelStatic } from "sequelize";
import { Model } from "sequelize-typescript";

/**
 * Throws error if given item id does not exist or isn't valid
 * @param id Role id to check
 */
export async function checkExistingId<M extends Model>(
    id: number,
    model: ModelStatic<M>
) {
    // Check is id is a number
    if (Number.isNaN(id))
        throw createHttpError(400, "Giver id is Not A Number");

    // Check if requested role id exist in database
    const existingPoste = await model.findByPk(id);
    if (existingPoste === null)
        throw createHttpError(404, "Wrong id or item doesn't exist");
}

export async function controllerErrorHandler(err: HttpError, res: Response) {
    if (err.status === undefined) {
        err.status = 500;
    }
    if (err.message === undefined) {
        err.message = "Unknown error";
    }
    res.status(err.status).json({
        status: err.status,
        message: err.message,
    });
}
