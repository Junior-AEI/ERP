// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Adherent from '../models/member.model'
import Utilisateur from '../models/utilisateur.model'
import { checkExistingId, checkIdIsNotNaN, controllerErrorHandler } from './utils.controller'
import { Op } from 'sequelize'
import createHttpError from 'http-errors'

// Functions in this controller :

// For the routes
//     getAllMembers, // Return the list of all members in database
//     getMemberById, // Return the member with the ID in param
//     createMember, // Create a new Member
//     deleteMemberById, // Return the member with the ID in param
//     updateMember, // Modify a member

// Just use in this file
//     checkExistingMember, // Verify if the member already exist

/**
 * Throws error if a member already exist in database
 * @param req
 */

const checkExistingMember = async (req: Request, res: Response) => {
    try {
        // If id isn't given (case of new member creation), set it to "null" (avoid database error)
        if (req.body.id === undefined) req.body.id = null

        // Check if given member isn't already in the database with another id
        const existingMember = await Adherent.findOne({
            where: {
                [Op.and]: [
                    { [Op.not]: { id: req.body.id } },
                    { [Op.or]: [{ email: req.body.email }] }
                ]
            }
        })

        // Return error Member already in DB
        if (existingMember !== null) {
            return res.status(409).json({
                status: 'error',
                message: 'Member already exists'
            })
        } else {
            // Return Ok
            return res.status(200).json({
                status: 'success'
            })
        }
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res)
    }
}

/**
 * All members reader for GET route
 * @param res :
 *  - Members in database + 200 confirmation
 *  - 500 error
 */

const getAllMembers = async (req: Request, res: Response) => {
    try {
        const allMembers = await Adherent.findAll({
            attributes: { exclude: ['motDePasse'] }, // Exclude password from the results
            include: { all: true, nested: true } // Include all related models
        })
        return res.status(200).json(allMembers) // Return all members
    } catch (err: any) {
        return controllerErrorHandler(err, res) // Handle any errors
    }
}

/**
 * Specific member (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right member)
 * @param res :
 *  - Requested member + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getMemberById(req: Request, res: Response) {
    try {
        // Check if req.params.id is not NaN
        await checkIdIsNotNaN(req.params.id).catch((err) => controllerErrorHandler(err, res))

        // Find requested member by primary key (id)
        const member = await Adherent.findByPk(req.params.id, {
            attributes: { exclude: ['motDePasse'] }
        })

        // Return the found member
        return res.status(200).json(member)
    } catch (err: any) {
        return controllerErrorHandler(err, res) // Handle any errors
    }
}

/**
 * Member creation for POST route
 * @param req Request (body used to create new member)
 * @param res :
 *  - 201 confirmation
 *  - 400 error if wrong datas are given
 *  - 409 error if role already exist
 *  - 500 error for database error
 */
const createMember = async (req: Request, res: Response) => {
    try {
        // Check if existing member
        await checkExistingMember(req, res)

        // Clean useless creation and update dates if given (setup while creating member)
        req.body.createdAt = null
        req.body.updatedAt = null

        // Create new member
        const member = await Adherent.create(req.body)

        // Return success
        return res.status(201).json({ id: member.id })
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res)
    }
}

/**
 * Member update for PUT route
 * @param req Request (body used to update member)
 * @param res :
 *  - 204 confirmation
 *  - 400 error if wrong datas are given
 *  - 404 error if member don't exist
 *  - 500 error for database error
 */

async function updateMember(req: Request, res: Response) {
    try {
        // Check if given name is not empty and if given member or member id doesn't already exist
        await checkExistingId<Adherent>(req.body.id, Adherent)
        await checkExistingMember(req, res)

        // Clean useless update dates if given (setup while creating member)
        req.body.updatedAt = null

        // Update requested member with given body
        const member = await Adherent.update(req.body, {
            where: { id: req.body.id }
        })

        // Return confirmation
        return res.status(204).json(member)
    } catch (err: any) {
        // Handle errors
        console.error('Test')
        return controllerErrorHandler(err, res)
    }
}

/**
 * Member remove for DELETE route
 * @param req Request (parameter "id" used to find member to delete)
 * @param res :
 *  - 204 confirmation (ressource deleted)
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteMemberById(req: Request, res: Response) {
    try {
        // Check if requested member id exists in the database
        await checkExistingId<Adherent>(req.params.id, Adherent)

        // Delete requested member by its id
        await Adherent.destroy({ where: { id: req.params.id } })

        // Return confirmation
        return res.status(204).json()
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res)
    }
}

const adherentController = {
    getAllMembers,
    getMemberById,
    createMember,
    deleteMemberById,
    updateMember
}

export default adherentController
