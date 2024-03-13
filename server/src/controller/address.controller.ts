// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { Request, Response } from "express";
import Adresse from "../models/address.model";
import { Op } from "sequelize";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";
import createHttpError from "http-errors";

// TODO: Setup validator ("express-validator" package?) to verify whole body

// Functions in this controller :

// For the routes
//     getAllMembers, // Return the list of all members in database
//     getMemberById, // Return the member with the ID in param
//     createMember, // Create a new Member
//     deleteMemberById, // Return the member with the ID in param
//     updateMember, // Modify a member

// Just use in this file
//     checkExistingAddress, // Verify if the member already exist

/**
 * Throws error if a address already exist in database
 * @param req Request to check (req.body used)
 */
async function checkExistingAddress(req: Request, res: Response) {
    try {
        // If id isn't given (case of new address creation), set it to "null" (avoid database error)
        if (req.body.id === undefined) req.body.id = null;

        // Check if the given address already exists in the database with another id
        const existingAddress = await Adresse.findOne({
            where: {
                [Op.and]: [
                    { [Op.not]: { id: req.body.id } },
                    {
                        [Op.and]: [
                            { adresse: req.body.adresse },
                            { complementAdresse: req.body.complementAdresse },
                            { ville: req.body.ville },
                            { codePostal: req.body.codePostal },
                            { pays: req.body.pays },
                        ],
                    },
                ],
            },
        });

        // If the address already exists, throw an error
        if (existingAddress !== null) {
            return res
                .status(409)
                .json({ status: "error", message: "Address already exists" });
        }
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res);
    }
}

/**
 * All addresses reader for GET route
 * @param res :
 *  - Addresses in database + 200 confirmation
 *  - 500 error
 */
async function getAllAddresses(req: Request, res: Response) {
    try {
        const addresses = await Adresse.findAll();
        return res.status(200).json(addresses);
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res);
    }
}

/**
 * Specific address (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right address)
 * @param res :
 *  - Requested address + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getAddressById(req: Request, res: Response) {
    try {
        // Check if req.params.id is not NaN
        await checkIdIsNotNaN(req.params.id).catch((err) =>
            controllerErrorHandler(err, res),
        );

        // Find requested member by primary key (id)
        const address = await Adresse.findByPk(req.params.id);

        // Return the found member
        return res.status(200).json(address);
    } catch (err: any) {
        return controllerErrorHandler(err, res); // Handle any errors
    }
}
/**
 * Address creation for POST route
 * @param req Request (body used to create new address)
 * @param res :
 *  - 201 confirmation
 *  - 400 error if wrong datas are given
 *  - 409 error if address already exist
 *  - 500 error for database error
 */
async function createAddress(req: Request, res: Response) {
    try {
        // Check if existing member
        await checkExistingAddress(req, res);

        // Clean useless creation and update dates if given (setup while creating address)
        req.body.createdAt = null;
        req.body.updatedAt = null;

        // Create new address
        const member = await Adresse.create(req.body);

        // Return success
        return res.status(201).json({ id: member.id });
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res);
    }
}

/**
 * Address update for PUT route
 * @param req Request (body used to update address)
 * @param res :
 *  - 204 confirmation (ressource updated)
 *  - 400 error if wrong datas are given
 *  - 404 error if address don't exist
 *  - 500 error for database error
 */
async function updateAddress(req: Request, res: Response) {
    try {
        // Check if given address is not empty and if given address or address id doesn't already exist
        await checkExistingId<Adresse>(req.body.id, Adresse);
        await checkExistingAddress(req, res);

        // Clean useless update dates if given (setup while creating address)
        req.body.updatedAt = null;

        // Update requested member with given body
        const address = await Adresse.update(req.body, {
            where: { id: req.body.id },
        });

        // Return confirmation
        return res.status(204).json(address);
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res);
    }
}

/**
 * Address remove for DELETE route
 * @param req Request (parameter "id" used to find address to delete)
 * @param res :
 *  - 204 confirmation (ressource deleted)
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteAddressById(req: Request, res: Response) {
    try {
        // Check if requested address id exist in database
        await checkExistingId<Adresse>(req.params.id, Adresse);

        // Delete requested member by its id
        await Adresse.destroy({ where: { id: req.params.id } });

        // Return confirmation
        return res.status(204).json();
    } catch (err: any) {
        // Handle errors
        return controllerErrorHandler(err, res);
    }
}

const AddressController = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddressById,
};

export default AddressController;
