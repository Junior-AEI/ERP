import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { controllerErrorHandler } from './utils.controller'
import Members from '../models/member.model'
import Projects from '../models/project.model'
import Contributors from '../models/contributor.model'

/**
 * Get all contributors
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const contributors = await Contributors.findAll({})
        console.log(contributors);

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
 * Select a specific contributor
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.contributorId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const contributor = await Contributors.findByPk(identifier)
        if (!contributor) throw createHttpError(404, 'Contributor not found')

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

async function getByProject(req: Request, res: Response) {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const contributors = await Contributors.findAll({
            where: {
                projectId: identifier
            }
        })

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
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // parse project identifier
        const idProject = parseInt(req.body.contributor.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier')

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found')

        // parse user identifier
        const idMember = parseInt(req.body.contributor.memberId)
        if (isNaN(idMember)) throw createHttpError(400, 'Please provide a valid member identifier')

        const member = await Members.findByPk(idMember)
        if (!member) throw createHttpError(404, 'Link member not found')

        // Insert data
        const contributor = await Contributors.create({
            memberId: idMember,
            projectId: idProject
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                contributorId: contributor.contributorId
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
        const identifier = parseInt(req.params.contributorId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const contributor = await Contributors.findByPk(identifier)
        if (!contributor) throw createHttpError(404, 'Contributor not found')

        // parse project identifier
        const idProject = parseInt(req.body.contributor.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier')

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found')

        // parse user identifier
        const idMember = parseInt(req.body.contributor.memberId)
        if (isNaN(idMember)) throw createHttpError(400, 'Please provide a valid member identifier')

        const member = await Members.findByPk(idMember)
        if (!member) throw createHttpError(404, 'Link member not found')

        await Contributors.update(req.body.contributor, {
            where: {
                contributorId: identifier
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
        const identifier = parseInt(req.params.contributorId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const contributor = await Contributors.findByPk(identifier)
        if (!contributor) throw createHttpError(404, 'Contributor not found')

        await Contributors.destroy({
            where: {
                contributorId: identifier
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

const contributorController = {
    getAll,
    getByPk,
    getByProject,
    create,
    del,
    update
}

export default contributorController
