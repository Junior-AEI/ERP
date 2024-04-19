import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler, isNumber } from './utils.controller'
import Belongers from '../models/belonger.model'
import Users from '../models/user.model'
import Groups from '../models/group.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const belongers = await Belongers.findAll({ })

        return res.status(200).json({
            status: 'success',
            data: {
                belongers: belongers
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
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), req.params.groupName];

        const belonger = await Belongers.findByPk((identifier[0], identifier[1]), {})

        if (!belonger) throw createHttpError(404, 'Belonger not found')

        return res.status(200).json({
            status: 'success',
            data: {
                belonger: belonger
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
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), req.params.groupName];

        // Try to find the linked user
        const user = await Users.findByPk(identifier[0])
        if (!user) return createHttpError(404, 'Unable to find the linked user.')

        // Try to find the linked group
        const group = await Groups.findByPk(identifier[1])
        if (!group) return createHttpError(404, 'Unable to find the linked group.')

        
        // Insert data
        const belonger = await Belongers.create({
            userId: identifier[0],
            groupName: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                userId: belonger.userId,
                groupName: belonger.groupName
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
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), req.params.groupName];

        const belonger = await Belongers.findByPk((identifier[0], identifier[1]))
        if (!belonger) throw createHttpError(404, 'Belonger not found')

        await Belongers.update(req.body, {
            where: { userId: identifier[0],
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
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), req.params.groupName];

        const belonger = await Belongers.findByPk((identifier[0], identifier[1]))
        if (!belonger) throw createHttpError(404, 'Belonger not found')

        await Belongers.destroy({
            where: {
                userId: identifier[0],
                groupName: identifier[1]
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const belongerController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default belongerController
