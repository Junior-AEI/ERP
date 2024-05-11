import dotenv from 'dotenv'
import { Request, Response } from 'express'
import fs from 'fs';
import { controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidDocument } from '../validator/document.validator'
import Users from '../models/user.model'
import Documents, { Status } from '../models/document.model'
import DocumentTypes from '../models/documentType.model'
import { getExtension, getType } from 'mime'


import multer from 'multer'
import { createHash } from 'crypto';

dotenv.config()

// Configuration de multer pour spécifier où stocker les fichiers uploadés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (process.env.NODE_ENV === "test") {
            if (typeof process.env.DIR_TEST_UPLOAD !== 'string') throw createHttpError(400, 'DIR_TEST_UPLOAD est undefined');
            else cb(null, process.env.DIR_TEST_UPLOAD) // Indique le répertoire où les fichiers seront stockés pour les tests
        } else {
            if (typeof process.env.DIR_UPLOAD !== 'string') throw createHttpError(400, 'DIR_UPLOAD est undefined');
            else cb(null, process.env.DIR_UPLOAD) // Indique le répertoire où les fichiers seront stockés
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${createHash('sha256')
            .update(file.originalname + new Date())
            .digest('hex')}.${getExtension(file.mimetype)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 10 ** 6 // Limite la taille des fichiers à 20 Mo
    },
}).single('file') // Utilisez .single('file') pour un seul fichier

/**
 * Get list of all documents
 * <!> Files not included
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


async function create(req: Request, res: Response) {
    try {
        upload(req, res, async (err: unknown) => {
            if (err) {
                return res.status(400).json(err);
            }

            if (req.body.document === undefined) {
                return res.status(400).json({ error: 'Document information is missing' });
            }

            if (req.file === undefined) {
                return res.status(400).json({ error: 'File is missing' });
            }

            // parse author (user) identifier
            const idAuthor = parseInt(req.body.document.authorId ?? undefined)
            if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier')

            const author = await Users.findByPk(idAuthor)
            if (!author) throw createHttpError(404, 'Link author not found')

            // parse documentType identifier
            const idType = parseInt(req.body.document.typeId ?? undefined)
            if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier')

            const documentName = req.body.document.name ?? undefined;
            const documentPath = req.file.path;
            const version = parseInt(req.body.document.version) ?? undefined;
            const information = req.body.document.information ?? undefined;
            const status = req.body.document.status ?? undefined as Status | undefined;

            const validator = isValidDocument(documentName, documentPath, version, information, status)
            if (validator.valid == 0) {
                return res.status(400).json({ error: validator.message });
            }

            // Insert data
            const document = await Documents.create({
                typeId: idType,
                authorId: idAuthor,
                name: documentName,
                path: documentPath,
                version: version,
                information: information,
                status: status
            })

            // Return success
            return res.status(200).json({
                status: 'success',
                data: {
                    documentId: document.documentId
                }
            })

        })
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Update a document
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err: unknown) => {
            if (err) {
                throw createHttpError(400, 'Error uploading file')
            }
            try {

                if (req.body.document === undefined) {
                    return res.status(400).json({ error: 'Document information is missing' });
                }

                // parse identifier
                const identifier = parseInt(req.params.documentId)
                if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

                const document = await Documents.findByPk(identifier)
                if (!document) throw createHttpError(404, 'Document not found')

                // parse author (user) identifier
                const idAuthor = parseInt(req.body.document.authorId ?? undefined)
                if (isNaN(idAuthor)) throw createHttpError(400, 'Please provide a valid author identifier')

                const author = await Users.findByPk(idAuthor)
                if (!author) throw createHttpError(404, 'Link author not found')

                // parse documentType identifier
                const idType = parseInt(req.body.document.typeId ?? undefined)
                if (isNaN(idType)) throw createHttpError(400, 'Please provide a valid documentType identifier')

                const documentName = req.body.document.name ?? document.name;

                const documentPath = req.file ? req.file.path : document.path;
                const version = parseInt(req.body.document.version) ?? document.version + 1;
                const information = req.body.document.information ?? document.information;
                const status = req.body.document.status ?? document.status as Status;

                const validator = isValidDocument(documentName, documentPath, version, information, status)
                if (validator.valid == 0) {
                    return res.status(400).json({ error: validator.message });
                }

                await Documents.update({
                    typeId: idType,
                    authorId: idAuthor,
                    name: documentName,
                    path: documentPath,
                    version: version,
                    information: information,
                    status: status
                }, {
                    where: { documentId: identifier }
                })

                return res.status(200).json({
                    status: 'success',
                    data: {
                        documentId: identifier,
                        document: {
                            typeId: idType,
                            authorId: idAuthor,
                            name: documentName,
                            path: documentPath,
                            version: version,
                            information: information,
                            status: status
                        }
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

        fs.unlinkSync(document.path) // Supprime le fichier du système de fichiers

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Télécharger un document par son identifiant
 * @param req
 * @param res
 */
const downloadById = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.documentId);
        if (isNaN(identifier)) {
            throw createHttpError(400, 'Please provide a valid document identifier');
        }

        const document = await Documents.findByPk(identifier);
        if (!document) {
            throw createHttpError(404, 'Document not found');
        }

        const filePath = document.path; // Chemin du fichier dans le système de fichiers
        if (fs.existsSync(filePath)) {
            const fileName = document.name; // Nom du fichier
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.type(getType(filePath) ?? 'application/octet-stream');
            res.download(filePath); // Déclenche le téléchargement du fichier
        } else {
            throw createHttpError(404, 'File not found');
        }
    } catch (err) {
        if (err instanceof HttpError) {
            res.status(err.status).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const documentController = {
    create,
    getAll,
    getByPk,
    update,
    del,
    downloadById,
}

export default documentController
