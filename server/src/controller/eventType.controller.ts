import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import EventTypes from '../models/eventType.model'
import { HttpError } from 'http-errors'
import { isValidEventType } from '../validator/eventType.validator'
import { controllerErrorHandler } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const eventTypes = await EventTypes.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                eventTypes: eventTypes
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific user
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.type) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = req.params.type

        const eventType = await EventTypes.findByPk(identifier, {})
        if (!eventType) throw createHttpError(404, 'event type not found')

        return res.status(200).json({
            status: 'success',
            data: {
                eventType: eventType
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        if (req.params.type) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = req.params.type

        // Test params
        const validator = isValidEventType(req.body.eventType.fieldNumber, req.body.eventType.fieldMeaning)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const eventType = await EventTypes.create({
            type: identifier,
            fieldNumber: req.body.eventType.fieldNumber,
            fieldMeaning: req.body.eventType.fieldMeaning,
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                type: eventType.type
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update an user
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        if (req.params.type) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = req.params.type

        const eventType = await EventTypes.findByPk(identifier, {})
        if (!eventType) throw createHttpError(404, 'event type not found')

        // Test params
        const validator = isValidEventType(req.body.eventType.fieldNumber, req.body.eventType.fieldMeaning)
        if (!validator.valid) return createHttpError(400, validator.message as string)
 
        await EventTypes.update(req.body, {
            where: { type: identifier }
        })

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Delete an user
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        if (req.params.type) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = req.params.type

        const eventType = await EventTypes.findByPk(identifier, {})
        if (!eventType) throw createHttpError(404, 'event type not found')

        await EventTypes.destroy({
            where: {
                type: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const eventTypeController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default eventTypeController

