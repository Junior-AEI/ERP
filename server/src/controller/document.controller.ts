// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Fichier from '../models/fichier.model'
import Document from '../models/document.model'
import { controllerErrorHandler } from './utils.controller'

//ajout pour le bot Telegram
import axios from "axios";

const documentController = {
    createDocument,
    uploadNewVersion,
    getAllDocuments,
    downloadFileById,
    getDocumentsToRead
}

async function createDocument(req: Request, res: Response) {
    await Document.create({
        nom: req.body.nom
    })
        .then((doc) => res.status(200).json({ id: doc.id }))
        .catch((err) => controllerErrorHandler(err, res))
}

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
                    statut: req.params.statut,
                });
                axios
                    .post("http://localhost:5001/api/bot/uploadDoc", {
                        doc: doc.nom,
                        statut: req.params.statut,
                    })

                    .catch((error: unknown) => {
                        console.error(
                            "Erreur lors de la requête POST vers /api/bot/uploadDoc:",
                            error,
                        );
                    });
                return { doc, version };
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

async function getAllDocuments(req: Request, res: Response) {
    await Document.findAll({
        include: {
            model: Fichier,
            separate: true,
            order: [['createdAt', 'DESC']]
        },
        order: [['updatedAt', 'DESC']]
    })
        .then((docs) => res.status(200).json(docs))
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

export default documentController
