import { Request, Response } from 'express'
import Documents from '../models/document.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidDocument } from '../validator/document.validator'

/**
 * Get all documents
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const documents = await Documents.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                documents: documents
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific document
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.id)

        const document = await Documents.findByPk(identifier)

        if (!document) throw createHttpError(404, 'User not found')

        return res.status(200).json({
            status: 'success',
            data: {
                document: document
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a document
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    // TODO : Ask for the user creator routine
}

/**
 * Update a document
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'User not found')

        const validator = isValidDocument(
            req.body.document.path,
            req.body.document.version,
            req.body.document.information,
            req.body.document.status
        )

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Documents.update(req.body, {
            where: { documentId: identifier }
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
 * Delete a document
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'User not found')

        await Documents.destroy({
            where: {
                documentId: req.body.document.documentId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const documentController = {
    create,
    getAll,
    getByPk,
    update,
    del
}

export default documentController