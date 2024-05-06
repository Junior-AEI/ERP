import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import ProjectNotes from '../models/projectNote.model'
import { HttpError } from 'http-errors'
import { isValidProjectNote } from '../validator/projectNote.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const projectNotes = await ProjectNotes.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                projectNotes: projectNotes
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
        if (req.params.noteId && !isNumber(req.params.noteId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.noteId)

        const projectNote = await ProjectNotes.findByPk(identifier, {})
        if (!projectNote) throw createHttpError(404, 'Project note not found')

        return res.status(200).json({
            status: 'success',
            data: {
                projectNote: projectNote
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}


const getByProject = async (req: Request, res: Response) => {
    try {
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)

        const projectNotes = await ProjectNotes.findAll({
            where: {
                projectId: identifier
            }
        })

        return res.status(200).json({
            status: 'success',
            data: {
                projectNotes: projectNotes
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const getLastNoteByProject = async (req: Request, res: Response) => {
    try {
        if (req.params.projectId && !isNumber(req.params.projectId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.projectId)
        console.log('identifier', identifier);
        
        const projectNotes = await ProjectNotes.findOne({
            where: {
                projectId: identifier
            },
            order: [['createdAt', 'DESC']],
        })

        return res.status(200).json({
            status: 'success',
            data: {
                projectNotes: projectNotes
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const search = async (req: Request, res: Response) => {
    try {
        const projectNotes = await ProjectNotes.findAll({
            where: {
                
            }
        })

        return res.status(200).json({
            status: 'success',
            data: {
                projectNotes: projectNotes
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
        if (req.params.noteId && !isNumber(req.params.noteId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.noteId)

        // Test params
        const validator = isValidProjectNote(req.body.user.comment, req.body.user.advancement)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const projectNote = await ProjectNotes.create({
            noteId: identifier,
            comment: req.body.user.comment,
            advancement: req.body.user.advancement
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                noteId: projectNote.noteId
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
        if (req.params.noteId && !isNumber(req.params.noteId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.noteId)

        const projectNote = await ProjectNotes.findByPk(identifier, {})
        if (!projectNote) throw createHttpError(404, 'Project note not found')

        // Test params
        const validator = isValidProjectNote(req.body.user.comment, req.body.user.advancement)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        await ProjectNotes.update(req.body, {
            where: { noteId: identifier }
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
        if (req.params.noteId && !isNumber(req.params.noteId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.noteId)

        const projectNote = await ProjectNotes.findByPk(identifier, {})
        if (!projectNote) throw createHttpError(404, 'Project note not found')

        await ProjectNotes.destroy({
            where: {
                noteId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const projectNotesController = {
    getAll,
    getByPk,
    getLastNoteByProject,
    getByProject,
    create,
    search,
    del,
    update
}

export default projectNotesController
