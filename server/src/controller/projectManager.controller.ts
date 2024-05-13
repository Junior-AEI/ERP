import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler } from './utils.controller'
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
        const projectManagers = await ProjectManagers.findAll({})

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
        const identifier = parseInt(req.params.projectManagerId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const projectManager = await ProjectManagers.findByPk(identifier)
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

async function getByProject(req: Request, res: Response) {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const projectManagers = await ProjectManagers.findAll({
            where: {
                projectId: identifier
            }
        })

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
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // parse project identifier
        const idProject = parseInt(req.body.projectManager.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier')

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found')

        // parse user identifier
        const idUser = parseInt(req.body.projectManager.userId)
        if (isNaN(idUser)) throw createHttpError(400, 'Please provide a valid user identifier')

        const user = await Users.findByPk(idUser)
        if (!user) throw createHttpError(404, 'Link user not found')

        // Insert data
        const projectManager = await ProjectManagers.create({
            userId: idUser,
            projectId: idProject
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                projectManagerId: projectManager.projectManagerId
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
        // parse identifier
        const identifier = parseInt(req.params.projectManagerId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const projectManager = await ProjectManagers.findByPk(identifier)
        if (!projectManager) throw createHttpError(404, 'Project manager not found')

        // parse project identifier
        const idProject = parseInt(req.body.projectManager.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier')

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found')

        // parse user identifier
        const idUser = parseInt(req.body.projectManager.userId)
        if (isNaN(idUser)) throw createHttpError(400, 'Please provide a valid user identifier')

        const user = await Users.findByPk(idUser)
        if (!user) throw createHttpError(404, 'Link user not found')

        await ProjectManagers.update(req.body.projectManager, {
            where: {
                projectManagerId: identifier
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
        // parse identifier
        const identifier = parseInt(req.params.projectManagerId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const projectManager = await ProjectManagers.findByPk(identifier)
        if (!projectManager) throw createHttpError(404, 'Project manager not found')

        await ProjectManagers.destroy({
            where: {
                projectManagerId: identifier
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

const projectManagerController = {
    getAll,
    getByPk,
    getByProject,
    create,
    del,
    update
}

export default projectManagerController
