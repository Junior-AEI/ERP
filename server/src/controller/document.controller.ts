import { Request, Response } from 'express'
import Documents from '../models/document.model'
import { controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidDocument } from '../validator/document.validator'
import Users from '../models/user.model'
import DocumentTypes from '../models/documentType.model'

import multer from 'multer'

// Configuration de multer pour spécifier où stocker les fichiers uploadés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/') // Indiquez le répertoire où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Utilisez le nom original du fichier pour le stockage
    }
})

const upload = multer({ storage: storage }).single('file') // Utilisez .single('file') pour un seul fichier

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
        // parse identifier
        const identifier = parseInt(req.params.documentId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'Document not found')

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
 *  ------- May have to be adapt to upload document --------
 **/
async function create(req: Request, res: Response) {
    try {
        upload(req, res, async (err: any) => {
            if (err) {
                throw createHttpError(400, 'Error uploading file')
            }
            try {
                // parse author (user) identifier
                const idAuthor = parseInt(req.body.document.authorId)
                if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier')

                const author = await Users.findByPk(idAuthor)
                if (!author) throw createHttpError(404, 'Link author not found')

                // parse documentType identifier
                const idType = parseInt(req.body.document.typeId)
                if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier')

                const type = await DocumentTypes.findByPk(idType)
                if (!type) throw createHttpError(404, 'Link document type not found')

                // Test params
                const validator = isValidDocument(req.body.document.path, req.body.document.version, req.body.document.information, req.body.document.status)
                if (validator.valid == 0) throw createHttpError(400, validator.message as string)

                // Insert data
                const document = await Documents.create({
                    typeId: idType,
                    authorId: idAuthor,
                    path: req.body.document.path,
                    version: req.body.document.version,
                    information: req.body.document.information,
                    status: req.body.document.status
                })

                // Return success
                return res.status(200).json({
                    status: 'success',
                    data: {
                        documentId: document.documentId
                    }
                })
            } catch (err) {
                if (err instanceof HttpError) controllerErrorHandler(err, res)
                else throw err
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update a document
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err: any) => {
            if (err) {
                throw createHttpError(400, 'Error uploading file')
            }
            try {
                // parse identifier
                const identifier = parseInt(req.params.documentId)
                if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

                const document = await Documents.findByPk(identifier)
                if (!document) throw createHttpError(404, 'Document not found')

                // parse author (user) identifier
                const idAuthor = parseInt(req.body.document.authorId)
                if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier')

                const author = await Users.findByPk(idAuthor)
                if (!author) throw createHttpError(404, 'Link author not found')

                // parse documentType identifier
                const idType = parseInt(req.body.document.typeId)
                if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier')

                const type = await DocumentTypes.findByPk(idType)
                if (!type) throw createHttpError(404, 'Link document type not found')

                // Test params
                const validator = isValidDocument(req.body.document.path, req.body.document.version, req.body.document.information, req.body.document.status)
                if (validator.valid == 0) throw createHttpError(400, validator.message as string)

                await Documents.update(req.body.document, {
                    where: { documentId: identifier }
                })

                return res.status(200).json({
                    status: 'success'
                })
            } catch (err) {
                if (err instanceof HttpError) controllerErrorHandler(err, res)
                else throw err
            }
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
        // parse identifier
        const identifier = parseInt(req.params.documentId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'Document not found')

        await Documents.destroy({
            where: {
                documentId: identifier
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

const documentController = {
    create,
    getAll,
    getByPk,
    update,
    del
}

export default documentController
