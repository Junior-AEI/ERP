import { Request, Response } from 'express'
import Clients from '../models/client.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidClient } from '../validator/client.validator'
import Companies from '../models/company.model'
import Persons from '../models/person.model'

/**
 * Get all clients
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const sort = req.query.sort as string | undefined // récupérer l'option sort dans la requête

        const clients = await Clients.findAll({
            order: [
                [sort ?? 'createdAt', 'DESC'],
            ],
        });
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
        const identifier = parseInt(req.params.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier.')

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
    try {
        // Parse identifier
        const identifier = parseInt(req.body.client.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const person = await Persons.findByPk(identifier)
        if (!person) throw createHttpError(404, 'Linked person not found')

        // Parse company identifier
        const idCompany = parseInt(req.body.client.companyId)
        if (isNaN(idCompany)) throw createHttpError(400, 'Please provide a valid company identifier.')
        // Try to find the company
        const company = await Companies.findByPk(idCompany)
        if (!company) throw createHttpError(404, 'Linked company not found.')

        // Test if parameters has been filled
        const validator = isValidClient(req.body.client.function, req.body.client.firstContact)

        // Test values
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert value
        const client = await Clients.create({
            clientId: identifier,
            function: req.body.client.function,
            firstContact: req.body.client.firstContact,
            companyId: idCompany
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                clientId: client.clientId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update a client
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        const identifier = parseInt(req.params.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'Client not found')

        // Parse company identifier
        const idCompany = parseInt(req.body.client.companyId)
        if (isNaN(idCompany)) throw createHttpError(400, 'Please provide a valid company identifier')

        const company = await Companies.findByPk(idCompany)
        if (!company) throw createHttpError(404, 'Company not found')

        // Check parameters
        const validator = isValidClient(req.body.client.function, req.body.client.firstContact)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Clients.update(req.body.client, {
            where: { clientId: identifier }
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
 * Delete a client
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        const identifier = parseInt(req.params.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'Client not found')

        await Clients.destroy({
            where: {
                clientId: identifier
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

const clientController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default clientController
