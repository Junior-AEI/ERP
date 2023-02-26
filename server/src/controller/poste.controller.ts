import { Request, Response } from "express";
import { Poste } from "../models/poste.model";
import { Op } from "sequelize";
import { checkExistingId } from "./utils.controller";

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
        throw new Error("Empty name provided");
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
    if (existingPoste !== null) throw new Error("Role already exist");
}

/**
 * All roles reader for GET route
 * @param res
 *  - Roles in database
 *  - 500 error
 */
async function getAllPostes(req: Request, res: Response) {
    await Poste.findAll().then((poste) => res.json(poste));
}

/**
 * Specific role (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right role)
 * @param res
 *  - Requested role
 *  - 401 error if "id" is NaN
 *  - 500 error for database error
 */
async function getPosteById(req: Request, res: Response) {
    try {
        // Check if req.params.id is a number
        if (Number.isNaN(req.params.id))
            throw new Error("Given id is Not A Number");

        // Find requested role by primary key (id)
        await Poste.findByPk(req.params.id)
            .then((poste) => res.json(poste))
            .catch((err) => res.status(500).json({ error: err.message }));
    } catch (err: any) {
        // return client error if wrong id has been given
        res.status(401).json({
            status: "error",
            message: err.message,
        });
    }
}

/**
 * Role creation for POST route
 * @param req Request (body used to create new role)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function createPoste(req: Request, res: Response) {
    try {
        // Check is given name is not empty and if given post doesn't already exist
        await checkEmptyName(req.body.nom);
        await checkExistingPoste(req);

        // Clean useless creation and update dates if given (setup while creating role)
        req.body.createdAt = null;
        req.body.updatedAt = null;

        // Create new role from given body
        await Poste.create(req.body)
            .then((poste) => res.status(200).json(poste))
            .catch((err) => res.status(500).json(err));
    } catch (err: any) {
        // return client error if wrong informations have been given
        res.status(401).json({
            status: "error",
            message: err.message,
        });
    }
}

/**
 * Role update for PUT route
 * @param req Request (body used to update role)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function updatePoste(req: Request, res: Response) {
    try {
        // Check is given name is not empty and if given role or role id doesn't already exist
        await checkEmptyName(req.body.nom);
        await checkExistingId<Poste>(req.body.id, Poste);
        await checkExistingPoste(req);

        // Clean useless update dates if given (setup while creating role)
        req.body.updatedAt = null;

        // Update requested role with given body
        await Poste.update(req.body, { where: { id: req.body.id } })
            .then((poste) => res.status(200).json(poste))
            .catch((err) => res.status(500).json(err));
    } catch (err: any) {
        // return client error if wrong informations have been given
        res.status(401).json({
            status: "error",
            message: err.message,
        });
    }
}

/**
 * Role remove for DELETE route
 * @param req Request (parameter "id" used to find role to delete)
 * @param res :
 *  - 200 confirmation
 *  - 401 error if given id is NaN or doesn't exist
 *  - 500 error for database error
 */
async function deletePosteById(req: Request, res: Response) {
    try {
        // Check if requested role id exist in database
        await checkExistingId<Poste>(parseInt(req.params.id), Poste);

        // Delete requested role by its id
        await Poste.destroy({ where: { id: req.params.id } })
            .then((poste) => res.status(200).json(poste))
            .catch((err) => res.status(500).json(err));
    } catch (err: any) {
        // return client error if wrong informations have been given
        res.status(401).json({
            status: "error",
            message: err.message,
        });
    }
}

export default posteController;
