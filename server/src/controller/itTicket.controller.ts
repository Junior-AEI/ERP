import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import ItTickets from '../models/ItTicket.model'
import { HttpError } from 'http-errors'
import { isValidItTicket } from '../validator/itTicket.validator'
import { controllerErrorHandler, isNumber, sendBotMesssage } from './utils.controller'

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
        sendBotMesssage(881607628, `Add Ticket.`)
        // Parse identifier for member heredity
        const identifier = parseInt(req.body.itTicket.userId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid userID')

        // Test params
        const validator = isValidItTicket(req.body.itTicket.title, req.body.itTicket.description, req.body.itTicket.applicationConcerned, 'A faire')
        sendBotMesssage(881607628, `Valid : ${validator.message} ApplicationConcerned : ${req.body.itTicket.applicationConcerned} descripiton : ${req.body.itTicket.descripiton}`)

        if (!validator.valid) return createHttpError(400, validator.message as string)


        // Insert data
        const itTicket = await ItTickets.create({
            userId : identifier,
            title: req.body.itTicket.title,
            description: req.body.itTicket.description,
            applicationConcerned: req.body.itTicket.applicationConcerned,
            state: 'A faire'
        })
        sendBotMesssage(881607628, `Response ${itTicket}`)

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
        console.log("Le n° Id est " + identifier + "String:" + req.params.ticketId + "\n")

        const itTicket = await ItTickets.findByPk(identifier, {})
        if (!itTicket) throw createHttpError(404, 'Ticket not found')

        // Test params
        const validator = isValidItTicket(req.body.itTicket.title, req.body.itTicket.description, req.body.itTicket.applicationConcerned, req.body.itTicket.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)


        await ItTickets.update({
            userId : req.body.itTicket.userId,
            title: req.body.itTicket.title,
            description: req.body.itTicket.description,
            applicationConcerned: req.body.itTicket.applicationConcerned,
            state: req.body.itTicket.state,
        }, {
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