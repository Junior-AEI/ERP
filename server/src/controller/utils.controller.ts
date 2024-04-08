import { Response } from 'express'
import { HttpError } from 'http-errors'

/**
 * Check if a string represents a number
 * @param id
 */
export function isNumber(str: string): boolean {
    return /^\d+$/.test(str)
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
