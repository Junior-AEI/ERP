import { Request, Response } from "express";
import { hash } from "bcrypt";
import { Op } from "sequelize";
import createHttpError from "http-errors";
import { Utilisateur } from "../models/utilisateur.model";
import { Poste } from "../models/poste.model";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";

const utilisateurController = {
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    deleteUtilisateurById,
    updateUtilisateur,
};

/**
 * Throws error if a user already exist in database
 * @param req Request to check (req.body used)
 */
async function checkExistingUtilisateur(req: Request): Promise<void> {
    // if id isn't given (case of new user creation), set it to "null" (avoid database error)
    if (req.body.id === undefined) req.body.id = null;

    // Check is given user isn't already in database with another id
    const existingUtilisateur = await Utilisateur.findOne({
        where: {
            [Op.and]: [
                { [Op.not]: { id: req.body.id } },
                {
                    [Op.or]: [
                        { nomUtilisateur: req.body.nomUtilisateur },
                        { mailJE: req.body.mailJE },
                    ],
                },
            ],
        },
    });
    if (existingUtilisateur !== null)
        throw createHttpError(409, "User already exist");
}

async function checkPasswordStrength(password: string) {
    console.log(password.length);
    if (password === null || password === undefined) {
        throw createHttpError(400, "Empty password given");
        // TODO : Discuss about password strength checking
    } else if (password.length <= 3) {
        throw createHttpError(400, "Password strength is too low");
    }
}

/**
 * All user reader for GET route
 * @param res :
 *  - Utilisateurs in database + 200 confirmation
 *  - 500 error
 */
async function getAllUtilisateurs(req: Request, res: Response) {
    await Utilisateur.findAll({ attributes: { exclude: ["motDePasse"] } })
        .then((users) => res.status(200).json(users))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific user (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right user)
 * @param res :
 *  - Requested user + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getUtilisateurById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested user by primary key (id)
            Utilisateur.findByPk(req.params.id, {
                attributes: { exclude: ["motDePasse"] },
            })
        )
        .then((poste) => res.status(200).json(poste))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * User creation for POST route
 * @param req Request (body used to create new user)
 * @param res :
 *  - 200 confirmation (new ressource created)
 *  - 400 error if wrong datas are given or password strength is too low
 *  - 409 error if user already exist
 *  - 500 error for database error
 */
async function createUtilisateur(req: Request, res: Response) {
    //TODO: Setup true data checking
    await checkExistingId<Poste>(req.body.posteId, Poste)
        .then(() => checkExistingUtilisateur(req))
        .then(() => checkPasswordStrength(req.body.motDePasse))
        .then(() => hash(req.body.motDePasse, 10))
        .then((hash) => {
            // Update body with hashed password
            req.body.motDePasse = hash;
            // Clean useless creation and update dates if given (setup while creating user)
            req.body.createdAt = null;
            req.body.updatedAt = null;
            return Utilisateur.create(req.body);
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * User update for PUT route
 * @param req Request (body used to update user)
 * @param res :
 *  - 204 confirmation (ressource updated)
 *  - 400 error if wrong datas are given or password strength is too low
 *  - 404 error if user don't exist
 *  - 500 error for database error
 */
async function updateUtilisateur(req: Request, res: Response) {
    // Check is given name is not empty and if given user or user id doesn't already exist
    // TODO : Add more checks if necessary
    await checkExistingId<Utilisateur>(req.body.id, Utilisateur)
        .then(() => checkPasswordStrength(req.body.motDePasse))
        .then(() => {
            return hash(req.body.motDePasse, 10);
        })
        .then((hash) => {
            // Update body with hashed password
            req.body.motDePasse = hash;
            // Clean useless update dates if given (setup while creating user)
            req.body.updatedAt = null;
            return Utilisateur.update(req.body, {
                where: { id: req.body.id },
            });
        })
        .then((user) => res.status(204).json(user))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * User remove for DELETE route
 * @param req Request (parameter "id" used to find user to delete)
 * @param res :
 *  - 204 confirmation (ressource deleted)
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteUtilisateurById(req: Request, res: Response) {
    // Check if requested user id exist in database
    await checkExistingId<Utilisateur>(req.params.id, Utilisateur)
        .then(() =>
            // Delete requested user by its id
            Utilisateur.destroy({ where: { id: req.params.id } })
        )
        .then((user) => res.status(204).json(user))
        .catch((err) => controllerErrorHandler(err, res));
}

export default utilisateurController;
