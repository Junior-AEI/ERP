import { Request, Response } from "express";
import { Entreprise } from "../models/entreprise.model";
import { Adresse } from "../models/adresse.model";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";
import { Op } from "sequelize";
import createHttpError from "http-errors";

const entrepriseController = {
    getAllEntreprises,
    getEntrepriseById,
    createEntreprise,
    deleteEntrepriseById,
    updateEntreprise,
};

/**
 * Throws error if a company already exist in database
 * @param req Request to check (req.body used)
 */
async function checkExistingEntreprise(req: Request): Promise<void> {
    // if id isn't given (case of new company creation), set it to "null" (avoid database error)
    if (req.body.id === undefined) req.body.id = null;

    // Check is given company isn't already in database with another id
    const existingEntreprise = await Entreprise.findOne({
        where: {
            [Op.and]: [
                { [Op.not]: { id: req.body.id } },
                {
                    [Op.or]: [{ nom: req.body.nom }],
                },
            ],
        },
    });
    if (existingEntreprise !== null)
        throw createHttpError(409, "Company already exist");
}

/**
 * All companies reader for GET route
 * @param res :
 *  - Companies in database + 200 confirmation
 *  - 500 error
 */
async function getAllEntreprises(req: Request, res: Response) {
    await Entreprise.findAll()
        .then((entreprise) => res.status(200).json(entreprise))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific company (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right company)
 * @param res :
 *  - Requested company + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getEntrepriseById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested company by primary key (id)
            Entreprise.findByPk(req.params.id)
        )
        .then((entreprise) => res.status(200).json(entreprise))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Company creation for POST route
 * @param req Request (body used to create new company)
 * @param res :
 *  - 201 confirmation
 *  - 400 error if wrong datas are given
 *  - 409 error if role already exist
 *  - 500 error for database error
 */
async function createEntreprise(req: Request, res: Response) {
    await checkExistingEntreprise(req)
        .then(() => {
            // Clean useless creation and update dates if given (setup while creating company)
            req.body.createdAt = null;
            req.body.updatedAt = null;

            return Entreprise.create(req.body);
        })
        .then((entreprise) => res.status(201).json({ id: entreprise.id }))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Company update for PUT route
 * @param req Request (body used to update company)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if wrong datas are given
 *  - 404 error if company don't exist
 *  - 500 error for database error
 */
async function updateEntreprise(req: Request, res: Response) {
    // Check is given name is not empty and if given company or company id doesn't already exist
    // TODO : Add more checks if necessary
    await checkExistingId<Entreprise>(req.body.id, Entreprise)
        .then(() => checkExistingEntreprise(req))
        .then(() => {
            // Clean useless update dates if given (setup while creating company)
            req.body.updatedAt = null;
            // Update requested company with given body
            return Entreprise.update(req.body, { where: { id: req.body.id } });
        })
        .then((entreprise) => res.status(204).json(entreprise))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Company remove for DELETE route
 * @param req Request (parameter "id" used to find company to delete)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteEntrepriseById(req: Request, res: Response) {
    // Check if requested company id exist in database
    await checkExistingId<Entreprise>(req.params.id, Entreprise)
        .then(() =>
            // Delete requested company by its id
            Entreprise.destroy({ where: { id: req.params.id } })
        )
        .then((entreprise) => res.status(204).json(entreprise))
        .catch((err) => controllerErrorHandler(err, res));
}

export default entrepriseController;
