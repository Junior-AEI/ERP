import { Request, Response } from "express";
import { Op } from "sequelize";
import createHttpError from "http-errors";
import Poste from "../models/poste.model";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";

const posteController = {
    getAllPostes,
    getPosteById,
    createPoste,
    updatePoste,
    deletePosteById,
};

// TODO: Setup validator ("express-validator" package?) to verify whole body

/**
 * Throws error if given role name is empty or null or undefined
 * @param name Role name to check
 */
async function checkEmptyName(name: string) {
    if (name === "" || name === undefined || name === null) {
        throw createHttpError(400, "Empty name provided");
    }
}

/**
 * Throws error if a role already exist in database
 * @param req Request to check (req.body used)
 */
async function checkExistingPoste(req: Request): Promise<void> {
    // if id isn't given (case of new role creation), set it to "null" (avoid database error)
    if (req.body.id === undefined) req.body.id = null;

    // Check is given role isn't already in database with another id
    const existingPoste = await Poste.findOne({
        where: {
            [Op.and]: [
                { [Op.not]: { id: req.body.id } },
                {
                    [Op.or]: [
                        { nom: req.body.nom },
                        { description: req.body.description },
                    ],
                },
            ],
        },
    });
    if (existingPoste !== null)
        throw createHttpError(409, "Post already exist");
}

/**
 * All roles reader for GET route
 * @param res :
 *  - Roles in database + 200 confirmation
 *  - 500 error
 */
async function getAllPostes(req: Request, res: Response) {
    await Poste.findAll()
        .then((poste) => res.status(200).json(poste))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific role (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right role)
 * @param res :
 *  - Requested role + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getPosteById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested role by primary key (id)
            Poste.findByPk(req.params.id)
        )
        .then((poste) => res.status(200).json(poste))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Role creation for POST route
 * @param req Request (body used to create new role)
 * @param res :
 *  - 201 confirmation (new ressource created)
 *  - 400 error if wrong datas are given
 *  - 409 error if role already exist
 *  - 500 error for database error
 */
async function createPoste(req: Request, res: Response) {
    await checkEmptyName(req.body.nom)
        .then(() => checkExistingPoste(req))
        .then(() => {
            req.body.createdAt = null;
            req.body.updatedAt = null;
            return Poste.create(req.body);
        })
        .then((poste) => res.status(201).json({ id: poste.id }))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Role update for PUT route
 * @param req Request (body used to update role)
 * @param res :
 *  - 204 confirmation (ressource updated)
 *  - 400 error if wrong datas are given
 *  - 404 error if role don't exist
 *  - 500 error for database error
 */
async function updatePoste(req: Request, res: Response) {
    // Check is given name is not empty
    await checkEmptyName(req.body.nom)
        .then(() =>
            // Check if given role or role id doesn't already exist
            checkExistingId<Poste>(req.body.id, Poste)
        )
        .then(() => checkExistingPoste(req))
        .then(() => {
            // Clean useless update dates if given (setup while creating role)
            req.body.updatedAt = null;
            // Update requested role with given body
            return Poste.update(req.body, { where: { id: req.body.id } });
        })
        .then((poste) => res.status(204).json(poste))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Role remove for DELETE route
 * @param req Request (parameter "id" used to find role to delete)
 * @param res :
 *  - 204 confirmation (ressource deleted)
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deletePosteById(req: Request, res: Response) {
    // Check if requested role id exist in database
    await checkExistingId<Poste>(req.params.id, Poste)
        .then(() =>
            // Delete requested role by its id
            Poste.destroy({ where: { id: req.params.id } })
        )
        .then((poste) => res.status(204).json(poste))
        .catch((err) => controllerErrorHandler(err, res));
}

export default posteController;
