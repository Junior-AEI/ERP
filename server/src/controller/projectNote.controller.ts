import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import ProjectNotes from '../models/projectNote.model'
import { HttpError } from 'http-errors'
import { isValidProjectNote } from '../validator/projectNote.validator'
import { controllerErrorHandler } from './utils.controller'
import Projects from '../models/project.model'
import Users from '../models/user.model'

/**
 * Get all projectNotes
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
 * Select a specific projectNote
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectNoteId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const projectNote = await ProjectNotes.findByPk(identifier)
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

/**
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // parse project identifier
        const idProject = parseInt(req.body.projectNote.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier');

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found');

        // parse writer (user) identifier
        const idWriter = parseInt(req.body.projectNote.writerId)
        if (isNaN(idWriter)) throw createHttpError(400, 'Please provide a valid writer identifier');

        const writer = await Users.findByPk(idWriter)
        if (!writer) throw createHttpError(404, 'Link writer not found')

        // Test params
        const validator = isValidProjectNote(req.body.projectNote.comment, req.body.projectNote.advancement)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const projectNote = await ProjectNotes.create({
            projectId: idProject,
            writerId: idWriter,
            comment: req.body.projectNote.comment,
            advancement: req.body.projectNote.advancement
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
        // parse identifier
        const identifier = parseInt(req.params.projectNoteId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier');

        const projectNote = await ProjectNotes.findByPk(identifier)
        if (!projectNote) throw createHttpError(404, 'Project note not found');


        // parse project identifier
        const idProject = parseInt(req.body.projectNote.projectId)
        if (isNaN(idProject)) throw createHttpError(400, 'Please provide a valid project identifier');

        const project = await Projects.findByPk(idProject)
        if (!project) throw createHttpError(404, 'Link project not found');


        // parse writer (user) identifier
        const idWriter = parseInt(req.body.projectNote.writerId)
        if (isNaN(idWriter)) throw createHttpError(400, 'Please provide a valid writer identifier');

        const writer = await Users.findByPk(idWriter)
        if (!writer) throw createHttpError(404, 'Link writer not found');
        

        // Test params
        const validator = isValidProjectNote(req.body.projectNote.comment, req.body.projectNote.advancement)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        await ProjectNotes.update(req.body.projectNote, {
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
        // parse identifier
        const identifier = parseInt(req.params.projectNoteId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier');

        const projectNote = await ProjectNotes.findByPk(identifier)
        if (!projectNote) throw createHttpError(404, 'Project note not found');

        await ProjectNotes.destroy({
            where: {
                noteId: identifier
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

const projectNoteController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default projectNoteController
