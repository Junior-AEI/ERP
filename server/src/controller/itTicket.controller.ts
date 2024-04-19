import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import ItTickets from '../models/ItTicket.model'
import { HttpError } from 'http-errors'
import { isValidItTicket } from '../validator/itTicket.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const itTickets = await ItTickets.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                itTickets: itTickets
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
        if (req.params.ticketId && !isNumber(req.params.ticketId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.ticketId)

        const itTicket = await ItTickets.findByPk(identifier, {})
        if (!itTicket) throw createHttpError(404, 'Ticket not found')

        return res.status(200).json({
            status: 'success',
            data: {
                itTicket: itTicket
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
        if (req.params.ticketId && !isNumber(req.params.ticketId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.ticketId)

        // Test params
        const validator = isValidItTicket(req.body.itTicket.title, req.body.itTicket.description, req.body.itTicket.applicationConcerned, req.body.itTicket.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const itTicket = await ItTickets.create({
            ticketId: identifier,
            title: req.body.itTicket.title,
            description: req.body.itTicket.description,
            applicationConcerned: req.body.itTicket.applicationConcerned,
            state: req.body.task.state
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                ticketId: itTicket.ticketId
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
        if (req.params.ticketId && !isNumber(req.params.ticketId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.ticketId)

        const itTicket = await ItTickets.findByPk(identifier, {})
        if (!itTicket) throw createHttpError(404, 'Ticket not found')
        
        // Test params
        const validator = isValidItTicket(req.body.itTicket.title, req.body.itTicket.description, req.body.itTicket.applicationConcerned, req.body.itTicket.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        await ItTickets.update(req.body, {
            where: { ticketId: identifier }
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
        if (req.params.ticketId && !isNumber(req.params.ticketId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.ticketId)

        const itTicket = await ItTickets.findByPk(identifier, {})
        if (!itTicket) throw createHttpError(404, 'Ticket not found')
        
        await ItTickets.destroy({
            where: {
                ticketId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const itTicketController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default itTicketController