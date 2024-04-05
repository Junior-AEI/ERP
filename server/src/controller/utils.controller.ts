import { Response } from 'express'
import createHttpError, { HttpError } from 'http-errors'
import { ModelStatic } from 'sequelize'
import { Model } from 'sequelize-typescript'

/**
 * Check if a string represents a number
 * @param id
 */
export function isNumber(str: string): boolean {
    return /^\d+$/.test(str)
}

/**
 * Throws BadRequest (400) error if given number is NaN
 * @param id Id to check
 */
export async function checkIdIsNotNaN(id: number | string) {
    if (typeof id === 'string') {
        id = parseInt(id)
    }
    if (Number.isNaN(id)) {
        throw createHttpError(400, 'Given id is Not A Number')
    }
}

/**
 * Throws error if given item id does not exist or isn't valid
 * @param id Role id to check
 */
export async function checkExistingId<M extends Model>(id: number | string, model: ModelStatic<M>) {
    // Check is id is a number
    return checkIdIsNotNaN(id)
        .then(() =>
            // Check if requested role id exist in database
            model.findByPk(id)
        )
        .then(async (existingPoste) => {
            if (existingPoste === null) {
                throw createHttpError(404, "Wrong id or item doesn't exist")
            }
        })
}

/**
 * Generic error handler for controllers
 * @param err Error to handle
 * @param res : Error status and message, 500 by default
 */
export async function controllerErrorHandler(err: HttpError, res: Response) {
    console.error(err)
    if (err.status === undefined) {
        err.status = 500
    }
    if (err.message === undefined) {
        err.message = 'Unknown error'
    }
    return res.status(err.status).json({
        status: err.status,
        message: err.message
    })
}
