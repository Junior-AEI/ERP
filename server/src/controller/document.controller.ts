import { Request, Response } from 'express'
import Documents from '../models/document.model'
import { controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidDocument } from '../validator/document.validator'
import Users from '../models/user.model'
import DocumentTypes from '../models/documentType.model'

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
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier');

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'Document not found');

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
        // parse author (user) identifier
        const idAuthor = parseInt(req.body.document.authorId)
        if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier');

        const author = await Users.findByPk(idAuthor)
        if (!author) throw createHttpError(404, 'Link author not found');

        // parse documentType identifier
        const idType = parseInt(req.body.document.typeId)
        if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier');

        const type = await DocumentTypes.findByPk(idType)
        if (!type) throw createHttpError(404, 'Link document type not found');

        // Test params
        const validator = isValidDocument(req.body.document.path, req.body.document.version, req.body.document.information, req.body.document.status)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string);

        // Insert data
        const document = await Documents.create({
            typeId: idType,
            authorId: idAuthor,
            path: req.body.document.path,
            version: req.body.document.version,
            information: req.body.document.information,
            status: req.body.document.status,
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
}

/**
 * Update a document
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // parse identifier
        const identifier = parseInt(req.params.documentId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier');

        const document = await Documents.findByPk(identifier)
        if (!document) throw createHttpError(404, 'Document not found');


        // parse author (user) identifier
        const idAuthor = parseInt(req.body.document.authorId)
        if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier');

        const author = await Users.findByPk(idAuthor)
        if (!author) throw createHttpError(404, 'Link author not found');


        // parse documentType identifier
        const idType = parseInt(req.body.document.typeId)
        if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier');

        const type = await DocumentTypes.findByPk(idType)
        if (!type) throw createHttpError(404, 'Link document type not found');

        // Test params
        const validator = isValidDocument(req.body.document.path, req.body.document.version, req.body.document.information, req.body.document.status)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string);

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


/**
------- Old version that could be useful later ---------

async function uploadNewVersion(req: Request, res: Response) {
    if (!req.file || req.file === undefined) {
        res.status(500).json({
            status: 500,
            message: 'Error! in file upload.'
        })
    } else {
        Document.findByPk(req.params.id)
            .then((doc) => {
                if (doc === null) {
                    throw new Error('Document not found')
                } else {
                    return doc
                }
            })
            .then(async (doc) => {
                const file = req.file || { path: '' }
                const version = await Fichier.create({
                    chemin: file.path,
                    documentId: doc.id,
                    statut: req.params.statut
                })
                axios
                    .post('http://localhost:5001/api/bot/uploadDoc', {
                        doc: doc.nom,
                        statut: req.params.statut
                    })

                    .catch((error: unknown) => {
                        console.error(
                            'Erreur lors de la requête POST vers /api/bot/uploadDoc:',
                            error
                        )
                    })
                return { doc, version }
            })
            .then((input: { doc: Document; version: Fichier }) => {
                input.doc.$add('version', input.version)
                return input.doc
            })
            .then((doc) => {
                doc.changed('updatedAt', true)
                return doc.update({ updatedAt: new Date() })
            })
            .then(() => res.status(200).json('File uploaded successfully'))
            .catch((err) => controllerErrorHandler(err, res))
    }
}

async function downloadFileById(req: Request, res: Response) {
    await Fichier.findByPk(req.params.id, { include: Document })
        .then((file: Fichier | null) => {
            if (file === null) {
                throw new Error('File not found')
            } else {
                res.download(__dirname + '/../../' + file.chemin, file.document.nom + '.pdf')
            }
        })
        .catch((err) => controllerErrorHandler(err, res))
}

async function getDocumentsToRead(req: Request, res: Response) {
    await Document.findAll({
        include: {
            model: Fichier,
            separate: true,
            order: [['createdAt', 'DESC']]
        },
        where: {
            statut: 'À relire'
        },
        order: [['updatedAt', 'DESC']]
    })
        .then((docs) => res.status(200).json(docs))
        .catch((err) => controllerErrorHandler(err, res))
}

**/