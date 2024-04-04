// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Pole from '../models/pole.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'

const poleController = {
    getAllPoles,
    getPoleByName,
    createPole,
    deletePoste
}

async function checkEmptyName(name: string) {
    if (name === '' || name === undefined || name === null) {
        throw createHttpError(400, 'Empty name provided')
    }
}
async function getAllPoles(req: Request, res: Response) {
    await Pole.findAll()
        .then((poles) => res.status(200).json(poles))
        .catch((err) => controllerErrorHandler(err, res))
}

async function getPoleByName(req: Request, res: Response) {
    await Pole.findByPk(req.params.nom)
        .then((pole) => {
            if (pole === null) res.status(404).json({ message: 'Pole not found' })
            else res.status(200).json(pole)
        })
        .catch((err) => controllerErrorHandler(err, res))
}

async function createPole(req: Request, res: Response) {
    await checkEmptyName(req.body.nom)
        .then(() => Pole.findByPk(req.body.nom))
        .then((pole) => {
            if (pole !== null) {
                res.status(409).json({ message: 'Pole already exist' })
                return
            }
            req.body.createdAt = null
            req.body.updatedAt = null
            Pole.create(req.body)
                .then((pole) => res.status(201).json({ nom: pole.nom }))
                .catch((err) => controllerErrorHandler(err, res))
        })
}

async function deletePoste(req: Request, res: Response) {
    await checkEmptyName(req.params.nom)
        .then(() => Pole.destroy({ where: { nom: req.params.nom } }))
        .then((deleted) => {
            if (deleted === 0) res.status(404).json({ message: 'Pole not found' })
            else
                res.status(200).json({
                    message: `Pole ${req.params.nom} deleted`
                })
        })
        .catch((err) => controllerErrorHandler(err, res))
}
export default poleController
