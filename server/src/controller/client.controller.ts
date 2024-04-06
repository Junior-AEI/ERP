// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Clients from '../models/client.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidClient } from '../validator/client.validator'


/**
 * TODO : Tests
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const clients = await Clients.findAll({ })

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
 * TODO : Tests
 * Select a specific user
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.id)

        const client = await Clients.findByPk(identifier)

        if (!client) throw createHttpError(404, 'Client not found')

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
 * TODO : Tests
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    // TODO : Ask for the user creator routine
}

/**
 * TODO : Tests
 * Update an user
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'User not found')

        const validator = isValidClient(req.body.client.function)

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Clients.update(req.body, {
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
 * TODO : Tests
 * Delete an user
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'User not found')

        await Clients.destroy({
            where: {
                clientId: req.body.client.clientId
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
