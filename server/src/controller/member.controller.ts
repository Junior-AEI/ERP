// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Members from '../models/member.model'
import { isNumber, controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidMember } from '../validator/member.validator'

/**
 * All members reader for GET route
 * @param res :
 *  - Members in database + 200 confirmation
 *  - 500 error
 */

const getAll = async (req: Request, res: Response) => {

    try {

        const members = await Members.findAll({
        });
    
        return res.status(200).json({
            status: 'success',
            data: {
                members: members
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
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
const getByPk = async (req: Request, res: Response) => {

    try {

        if(req.params.id && !isNumber(req.params.id)) throw createHttpError(400, "Please provide a valid identifier");

        const identifier = parseInt(req.params.id);

        const member = await Members.findByPk(identifier);

        if(!member) throw createHttpError(404, "Member not found");

        return res.status(200).json({
            status: "success",
            data: {
                member: member
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
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
const create = async (req: Request, res: Response) => {
    // TODO : Ask for the user creator routine
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
const update = async (req: Request, res: Response) => {

    try {

        // Parse identifier
        if(req.params.id && !isNumber(req.params.id)) throw createHttpError(400, "Please provide a valid identifier");
        const identifier = parseInt(req.params.id);
        
        const member = await Members.findByPk(identifier);
        if(!member) throw createHttpError(404, "User not found");

        const validator = isValidMember(req.body.group.birthDate, 
                                        req.body.group.birthPlace, 
                                        req.body.group.nationality, 
                                        req.body.group.promotion,
                                        req.body.group.contributionDate,
                                        req.body.group.department);

        if(validator.valid == 0) throw createHttpError(400, validator.message as string);

        await Members.update(req.body, {
            where: {memberId: identifier} 
        });

        return res.status(200).json({
            status: 'success'
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
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
async function del(req: Request, res: Response) {
    try {

        // Parse identifier
        if(req.params.id && !isNumber(req.params.id)) throw createHttpError(400, "Please provide a valid identifier");
        const identifier = parseInt(req.params.id);
        
        const member = await Members.findByPk(identifier);
        if(!member) throw createHttpError(404, "Group not found");

        await Members.destroy({
            where: {
                userId: req.body.user.userId
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
    }
}

const memberController = {
    getAll,
    getByPk,
    create,
    del,
    update,
}

export default memberController
