import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler, isNumber } from './utils.controller'
import Members from '../models/member.model'
import Projects from '../models/project.model'
import Contributors from '../models/contributor.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const contributors = await Contributors.findAll({ })

        return res.status(200).json({
            status: 'success',
            data: {
                contributors: contributors
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
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.memberId), parseInt(req.params.projectId)];

        const contributor = await Contributors.findByPk((identifier[0], identifier[1]), {})

        if (!contributor) throw createHttpError(404, 'Project manager not found')

        return res.status(200).json({
            status: 'success',
            data: {
                contributor: contributor
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
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.memberId), parseInt(req.params.projectId)];

        // Try to find the linked member
        const member = await Members.findByPk(identifier[0])
        if (!member) return createHttpError(404, 'Unable to find the linked member.')

        // Try to find the linked project
        const project = await Projects.findByPk(identifier[1])
        if (!project) return createHttpError(404, 'Unable to find the linked project.')

        
        // Insert data
        const contributor = await Contributors.create({
            memberId: identifier[0],
            projectId: identifier[1]
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                memberId: contributor.memberId,
                projectId:contributor.projectId
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
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.memberId), parseInt(req.params.projectId)];

        const contributor = await Contributors.findByPk((identifier[0], identifier[1]))
        if (!contributor) throw createHttpError(404, 'Contributor not found')

        await Contributors.update(req.body, {
            where: { memberId: identifier[0],
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
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = [parseInt(req.params.memberId), parseInt(req.params.projectId)];

        const contributor = await Contributors.findByPk((identifier[0], identifier[1]))
        if (!contributor) throw createHttpError(404, 'Contributor not found')

        await Contributors.destroy({
            where: {
                memberId: identifier[0],
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
