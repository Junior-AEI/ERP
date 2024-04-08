// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Documents from '../models/document.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidDocument } from '../validator/document.validator'

// ajout pour le bot Telegram
// import axios from 'axios'

/**
 * TODO : Tests
 * Get all users
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
 * TODO : Tests
 * Select a specific user
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
 * TODO : Tests
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    // TODO : Ask for the user creator routine
}

/**
 * TODO : Tests
 * Update an user
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
 * TODO : Tests
 * Delete an user
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
