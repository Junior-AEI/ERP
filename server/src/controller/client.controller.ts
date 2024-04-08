import { Request, Response } from 'express'
import Clients from '../models/client.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidClient } from '../validator/client.validator'
import Companies from '../models/company.model'

/**
 * Get all clients
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const clients = await Clients.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                clients: clients
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific client
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.clientId || !isNumber(req.params.clientId))
            throw createHttpError(400, 'Please provide a valid identifier.')

        const identifier = parseInt(req.params.clientId)

        const client = await Clients.findByPk(identifier)

        if (!client) throw createHttpError(404, 'Client not found.')

        return res.status(200).json({
            status: 'success',
            data: {
                client: client
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}
/**
 * Create a client
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    
    // Test if parameters has been filled
    const validator = isValidClient(req.body.client.function, req.body.client.companyId);

    // Try to find the company
    const company = await Companies.findByPk(parseInt(req.body.client.companyId));
    if(!company) return createHttpError(400, "Your company id is not valid.");

    // Test values
    if(!validator.valid) return createHttpError(400, validator.message as string);

    // Insert value
    const client = await Clients.create({
        function: req.body.client.function,
        companyId: req.body.client.companyId
    });

    // Return success
    return res.status(200).json({
        status: 'success',
        data: {
            clientId: client.clientId
        }
    });

}

/**
 * Update a client
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.clientId && !isNumber(req.params.clientId))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.clientId)

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'User not found')

        const validator = isValidClient(req.body.client.function, req.body.client.companyId);

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Clients.update(req.body, {
            where: { clientId: identifier }
        });

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Delete a client
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.clientId && !isNumber(req.params.clientId))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.clientId)

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'User not found')

        await Clients.destroy({
            where: {
                clientId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const clientController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default clientController
