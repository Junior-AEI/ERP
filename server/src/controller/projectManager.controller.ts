import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler, isNumber } from './utils.controller'
import ProjectManagers from '../models/projectManager.model'
import Users from '../models/user.model'
import Projects from '../models/project.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const projectManagers = await ProjectManagers.findAll({ })

        return res.status(200).json({
            status: 'success',
            data: {
                projectManagers: projectManagers
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), parseInt(req.params.projectId)];

        const projectManager = await ProjectManagers.findByPk((identifier[0], identifier[1]), {})

        if (!projectManager) throw createHttpError(404, 'Project manager not found')

        return res.status(200).json({
            status: 'success',
            data: {
                projectManager: projectManager
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), parseInt(req.params.projectId)];

        // Try to find the linked user
        const user = await Users.findByPk(identifier[0])
        if (!user) return createHttpError(404, 'Unable to find the linked user.')

        // Try to find the linked project
        const project = await Projects.findByPk(identifier[1])
        if (!project) return createHttpError(404, 'Unable to find the linked project.')

        
        // Insert data
        const projectManager = await ProjectManagers.create({
            userId: identifier[0],
            projectId: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                userId: projectManager.userId,
                projectId: projectManager.projectId
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), parseInt(req.params.projectId)];

        const projectManager = await ProjectManagers.findByPk((identifier[0], identifier[1]))
        if (!projectManager) throw createHttpError(404, 'Belonger not found')

        await ProjectManagers.update(req.body, {
            where: { userId: identifier[0],
                     projectId: identifier[1]
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.userId), parseInt(req.params.projectId)];

        const projectManager = await ProjectManagers.findByPk((identifier[0], identifier[1]))
        if (!projectManager) throw createHttpError(404, 'Belonger not found')

        await ProjectManagers.destroy({
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

const userController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default userController
