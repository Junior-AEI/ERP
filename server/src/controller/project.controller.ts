import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Projects from '../models/project.model'
import { HttpError } from 'http-errors'
import { isValidProject } from '../validator/project.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const projects = await Projects.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                projects: projects
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        return res.status(200).json({
            status: 'success',
            data: {
                project: project
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)

        // Test params
        const validator = isValidProject(req.body.user.acronym, req.body.user.startDate, req.body.user.endDate)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const project = await Projects.create({
            projectId: identifier,
            acronym: req.body.user.acronym,
            startDate: req.body.user.startDate,
            endDate: req.body.user.endDate
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                projectId: project.projectId
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        // Test params
        const validator = isValidProject(req.body.user.acronym, req.body.user.startDate, req.body.user.endDate)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        await Projects.update(req.body, {
            where: { projectId: identifier }
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
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        await Projects.destroy({
            where: {
                projectId: identifier
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
