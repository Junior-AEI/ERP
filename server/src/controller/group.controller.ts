// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from 'express'
import Groups from '../models/group.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'
import { isValidGroup } from '../validator/group.validator'
import { HttpError } from 'http-errors'


/**
 * TODO : Tests
 * Get all users
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {

    try {

        const groups = await Groups.findAll({
        });
    
        return res.status(200).json({
            status: 'success',
            data: {
                groups: groups
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
    }

}

/**
 * TODO : Tests
 * Get all users
 * @param req 
 * @param res 
 */
const getByPk = async (req: Request, res: Response) => {

    try {

        if(req.params.groupName) throw createHttpError(400, "Please provide a valid identifier");

        const identifier = parseInt(req.params.name);

        const group = await Groups.findByPk(identifier);

        if(!group) throw createHttpError(404, "User not found");

        return res.status(200).json({
            status: "success",
            data: {
                group: group
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
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
 * Update a group
 * @param req 
 * @param res
 */
const update = async (req: Request, res: Response) => {

    try {

        // Parse identifier
        if(req.params.groupName) throw createHttpError(400, "Please provide a valid group name");
        const identifier = parseInt(req.params.groupName);
        
        const group = await Groups.findByPk(identifier);
        if(!group) throw createHttpError(404, "Group not found");

        const validator = isValidGroup(req.body.group.groupName);

        if(validator.valid == 0) throw createHttpError(400, validator.message as string);

        req.body.user.updatedAt = null;

        await Groups.update(req.body, {
            where: {groupName: identifier} 
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
 * TODO : Tests
 * Delete an user
 * @param req 
 * @param res 
 */
const del = async (req: Request, res: Response) => {

    try {

        // Parse identifier
        if(req.params.groupName) throw createHttpError(400, "Please provide a valid identifier");
        const identifier = req.params.groupName;
        
        const group = await Groups.findByPk(identifier);
        if(!group) throw createHttpError(404, "User not found");

        await Groups.destroy({
            where: {
                groupName: req.body.group.groupName
            }
        });

    }
    catch(err) {
        if(err instanceof HttpError) controllerErrorHandler(err, res);
        else throw err;
    }

}

const groupController = {
    getAll,
    getByPk,
    create,
    del,
    update,
}

export default groupController
