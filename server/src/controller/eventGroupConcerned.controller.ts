import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler, isNumber } from './utils.controller'
import EventGroupConcerned from '../models/eventGroupConcerned.model'
import Events from '../models/event.model'
import Groups from '../models/group.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const eventGroupConcerned = await EventGroupConcerned.findAll({ })

        return res.status(200).json({
            status: 'success',
            data: {
                eventGroupConcerned: eventGroupConcerned
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
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.eventId), req.params.groupName];
        const eventGroupConcerned = await EventGroupConcerned.findByPk((identifier[0], identifier[1]), {})

        if (!eventGroupConcerned) throw createHttpError(404, 'event group concerned not found')

        return res.status(200).json({
            status: 'success',
            data: {
                eventGroupConcerned: eventGroupConcerned
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
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.eventId), req.params.groupName];
        
        // Try to find the linked event
        const event = await Events.findByPk(identifier[0])
        if (!event) return createHttpError(404, 'Unable to find the linked event.')

        // Try to find the linked group
        const group = await Groups.findByPk(identifier[1])
        if (!group) return createHttpError(404, 'Unable to find the linked group.')

        
        // Insert data
        const eventGroupConcerned = await EventGroupConcerned.create({
            eventId: identifier[0],
            groupName: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                eventId: eventGroupConcerned.eventId,
                groupName: eventGroupConcerned.groupName
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
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.eventId), req.params.groupName];
        
        const eventGroupConcerned = await EventGroupConcerned.findByPk((identifier[0], identifier[1]), {})
        if (!eventGroupConcerned) throw createHttpError(404, 'event group concerned not found')

        await eventGroupConcerned.update(req.body, {
            where: { eventId: identifier[0],
                     groupName: identifier[1]
            }
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
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.eventId), req.params.groupName];
        
        const eventGroupConcerned = await EventGroupConcerned.findByPk((identifier[0], identifier[1]), {})
        if (!eventGroupConcerned) throw createHttpError(404, 'event group concerned not found')

        await EventGroupConcerned.destroy({
            where: {
                eventId: identifier[0],
                groupName: identifier[1]
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const eventGroupConcernedController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default eventGroupConcernedController
