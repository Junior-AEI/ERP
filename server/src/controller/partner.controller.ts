import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler, isNumber } from './utils.controller'
import Partners from '../models/partner.model'
import Events from '../models/event.model'
import Companies from '../models/company.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const partners = await Partners.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                partners: partners
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
        if (req.params.companyId && !isNumber(req.params.companyId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.companyId), parseInt(req.params.eventId)]

        const partner = await Partners.findByPk((identifier[0], identifier[1]), {})
        if (!partner) throw createHttpError(404, 'partner not found')

        return res.status(200).json({
            status: 'success',
            data: {
                partner: partner
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
        if (req.params.companyId && !isNumber(req.params.companyId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.companyId), parseInt(req.params.eventId)]

        // Try to find the linked company
        const company = await Companies.findByPk(identifier[0])
        if (!company) return createHttpError(404, 'Unable to find the linked company.')

        // Try to find the linked project
        const event = await Events.findByPk(identifier[1])
        if (!event) return createHttpError(404, 'Unable to find the linked event.')

        // Insert data
        const partner = await Partners.create({
            companyId: identifier[0],
            eventId: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                companyId: partner.companyId,
                eventId: partner.eventId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update an company
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        if (req.params.companyId && !isNumber(req.params.companyId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.companyId), parseInt(req.params.eventId)]

        const partner = await Partners.findByPk((identifier[0], identifier[1]), {})
        if (!partner) throw createHttpError(404, 'partner not found')

        await Partners.update(req.body, {
            where: { companyId: identifier[0], eventId: identifier[1] }
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
        if (req.params.companyId && !isNumber(req.params.companyId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.eventId && !isNumber(req.params.eventId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.companyId), parseInt(req.params.eventId)]

        const partner = await Partners.findByPk((identifier[0], identifier[1]), {})
        if (!partner) throw createHttpError(404, 'partner not found')

        await Partners.destroy({
            where: {
                companyId: identifier[0],
                eventId: identifier[1]
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const partnerController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default partnerController
