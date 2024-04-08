import { Request, Response } from 'express'
import Groups from '../models/group.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'
import { isValidGroup } from '../validator/group.validator'
import { HttpError } from 'http-errors'

/**
 * Get all groups
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const groups = await Groups.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                groups: groups
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Get a specific group
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.name)

        const group = await Groups.findByPk(identifier)

        if (!group) throw createHttpError(404, 'User not found')

        return res.status(200).json({
            status: 'success',
            data: {
                group: group
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a group
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    // TODO : Ask for the user creator routine
}

/**
 * Update a group
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid group name')
        const identifier = parseInt(req.params.groupName)

        const group = await Groups.findByPk(identifier)
        if (!group) throw createHttpError(404, 'Group not found')

        const validator = isValidGroup(req.body.group.groupName)

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        req.body.user.updatedAt = null

        await Groups.update(req.body, {
            where: { groupName: identifier }
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
 * Delete a group
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.groupName) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = req.params.groupName

        const group = await Groups.findByPk(identifier)
        if (!group) throw createHttpError(404, 'User not found')

        await Groups.destroy({
            where: {
                groupName: req.body.group.groupName
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const groupController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default groupController
