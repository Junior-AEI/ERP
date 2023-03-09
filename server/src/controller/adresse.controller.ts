import { Request, Response } from "express";
import { Adresse } from "../models/adresse.model";
import { Op } from "sequelize";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";
import createHttpError from "http-errors";

const adresseController = {
    getAllAdresses,
    getAdresseById,
    createAdresse,
    updateAdresse,
    deleteAdresseById,
};

// TODO: Setup validator ("express-validator" package?) to verify whole body

/**
 * Throws error if a address already exist in database
 * @param req Request to check (req.body used)
 */
async function checkExistingAdresse(req: Request): Promise<void> {
    // if id isn't given (case of new address creation), set it to "null" (avoid database error)
    if (req.body.id === undefined) req.body.id = null;

    // Check if given address isn't already in database with another id
    const existingAdresse = await Adresse.findOne({
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
    if (existingAdresse !== null) {
        throw createHttpError(409, "Address already exist");
    }
}

/**
 * All addresses reader for GET route
 * @param res :
 *  - Addresses in database + 200 confirmation
 *  - 500 error
 */
async function getAllAdresses(req: Request, res: Response) {
    await Adresse.findAll()
        .then((adresse) => res.status(200).json(adresse))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific address (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right address)
 * @param res :
 *  - Requested address + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getAdresseById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested address by primary key (id)
            Adresse.findByPk(req.params.id)
        )
        .then((adresse) => res.status(200).json(adresse))
        .catch((err) => controllerErrorHandler(err, res));
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
async function createAdresse(req: Request, res: Response) {
    await checkExistingAdresse(req)
        .then(() => {
            // Clean useless creation and update dates if given (setup while creating address)
            req.body.createdAt = null;
            req.body.updatedAt = null;
            // Create new address from given body
            return Adresse.create(req.body);
        })
        .then((adresse) => res.status(201).json({ id: adresse.id }))
        .catch((err) => controllerErrorHandler(err, res));
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
async function updateAdresse(req: Request, res: Response) {
    // Check is given name is not empty and if given address or address id doesn't already exist
    await checkExistingId<Adresse>(req.body.id, Adresse)
        // .then(() => checkExistingAdresse(req))
        .then(() => {
            // Clean useless update dates if given (setup while creating address)
            req.body.updatedAt = null;
            // Update requested address with given body
            return Adresse.update(req.body, { where: { id: req.body.id } });
        })
        .then((adresse) => res.status(204).json(adresse))
        .catch((err) => controllerErrorHandler(err, res));
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
async function deleteAdresseById(req: Request, res: Response) {
    // Check if requested address id exist in database
    await checkExistingId<Adresse>(req.params.id, Adresse)
        .then(() =>
            // Delete requested address by its id
            Adresse.destroy({ where: { id: req.params.id } })
        )
        .then((adresse) => res.status(204).json(adresse))
        .catch((err) => controllerErrorHandler(err, res));
}

export default adresseController;
