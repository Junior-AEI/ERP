import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Events from '../models/event.model'
import { HttpError } from 'http-errors'
import { isValidEvent } from '../validator/event.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const events = await Events.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                events: events
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
        const identifier = parseInt(req.params.eventId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const event = await Events.findByPk(identifier)

        if (!event) throw createHttpError(404, 'event not found')

        return res.status(200).json({
            status: 'success',
            data: {
                event: event
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

        // Test params
        const validator = isValidEvent(req.body.event.name, req.body.event.startDate, req.body.event.endDate, req.body.event.location, req.body.event.description, req.body.event.eventTypeName)

        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const event = await Events.create({
            name: req.body.event.name,
            startDate: req.body.event.startDate,
            endDate: req.body.event.endDate,
            location: req.body.event.location,
            description: req.body.event.description,
            eventTypeName: req.body.event.eventTypeName
        });

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                eventId: event.eventId
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
        const identifier = parseInt(req.params.eventId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const event = await Events.findByPk(identifier)
        if (!event) throw createHttpError(404, 'Event not found')

        // Test params
        const validator = isValidEvent(req.body.event.name, req.body.event.startDate, req.body.event.endDate, req.body.event.location, req.body.event.description, req.body.event.eventTypeName)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        await Events.update(req.body.event, {
            where: { eventId: identifier }
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
        const identifier = parseInt(req.params.eventId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')
        
        const event = await Events.findByPk(identifier)
        if (!event) throw createHttpError(404, 'Event not found')
        
        await Events.destroy({
            where: {
                eventId: identifier
            }
        })

        return res.status(200).json({
            status: 'success'
        });

    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const eventController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default eventController
