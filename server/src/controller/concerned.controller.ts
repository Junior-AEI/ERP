import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler } from './utils.controller'
import Concerned from '../models/concerned.model'
import Permissions from '../models/permission.model'
import Groups from '../models/group.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const concerned = await Concerned.findAll({ })

        return res.status(200).json({
            status: 'success',
            data: {
                concerned: concerned
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
        if (req.params.permissionId) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupId) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.permissionId), req.params.groupId];

        const permission = await Permissions.findByPk((identifier[0], identifier[1]), {})

        if (!permission) throw createHttpError(404, 'Permission not found')

        return res.status(200).json({
            status: 'success',
            data: {
                permission: permission
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
        if (req.params.permissionId) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupId) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [req.params.permissionId, req.params.groupId];

        // Try to find the linked permission
        const user = await Permissions.findByPk(identifier[0])
        if (!user) return createHttpError(404, 'Unable to find the linked permission.')

        // Try to find the linked group
        const group = await Groups.findByPk(identifier[1])
        if (!group) return createHttpError(404, 'Unable to find the linked group.')

        
        // Insert data
        const concerned = await Concerned.create({
            permissionId: identifier[0],
            groupId: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                concernedId: concerned.concernedId
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
        if (req.params.permissionId) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupId) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [req.params.permissionId, req.params.groupId];

        const permission = await Permissions.findByPk((identifier[0], identifier[1]))
        if (!permission) throw createHttpError(404, 'Concerned not found')

        await Concerned.update(req.body.concerned, {
            where: { 
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
        if (req.params.permissionId) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.groupId) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [req.params.permissionId, req.params.groupId];

        const permission = await Permissions.findByPk((identifier[0], identifier[1]))
        if (!permission) throw createHttpError(404, 'Concerned not found')

        await Concerned.destroy({
            where: {
                permissionId: identifier[0],
                groupId: identifier[1]
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const concernedController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default concernedController
