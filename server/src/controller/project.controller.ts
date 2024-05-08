import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Projects from '../models/project.model'
import { HttpError } from 'http-errors'
import { isValidProject } from '../validator/project.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'
import Clients from '../models/client.model'

/**
 * Get all projects
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
 * Select a specific project
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

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
 * Create an project
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        const identifier = parseInt(req.body.project.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid client identifier')

        // Try to find the linked client
        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'Unable to find the linked client.')

        // Test params
        const validator = isValidProject(req.body.project.acronym, req.body.project.startDate, req.body.project.endDate)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const project = await Projects.create({
            clientId: identifier,
            acronym: req.body.project.acronym,
            startDate: new Date(req.body.project.startDate),
            endDate: new Date(req.body.project.endDate)
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
 * Update an project
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        // parse client identifier
        const idClient = parseInt(req.body.project.clientId)
        if (isNaN(idClient)) throw createHttpError(400, 'Please provide a valid client identifier')

        // Try to find the linked client
        const client = await Clients.findByPk(idClient)
        if (!client) throw createHttpError(404, 'Unable to find the linked client.')

        // Test params
        const validator = isValidProject(req.body.project.acronym, req.body.project.startDate, req.body.project.endDate)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        await Projects.update(req.body.project, {
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
 * Delete an project
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        await Projects.destroy({
            where: {
                projectId: identifier
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

const projectController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default projectController
