import { Request, Response } from "express";
import { Utilisateur } from "../models/utilisateur.model";
import { Poste } from "../models/poste.model";
import { checkExistingId } from "./utils.controller";
import { hash } from "bcrypt";
import { Op } from "sequelize";
import { hasUncaughtExceptionCaptureCallback } from "process";

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
    if (existingUtilisateur !== null) throw new Error("User already exist");
}

/**
 * All user reader for GET route
 * @param res
 *  - Utilisateurs in database
 *  - 500 error
 */
async function getAllUtilisateurs(req: Request, res: Response) {
    console.log("req");
    await Utilisateur.findAll({ attributes: { exclude: ["motDePasse"] } }).then(
        (users) => res.json(users)
    );
}

/**
 * Specific user (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right user)
 * @param res
 *  - Requested user
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getUtilisateurById(req: Request, res: Response) {
    try {
        // Check if req.params.id is a number
        if (Number.isNaN(parseInt(req.params.id)))
            throw new Error("Given id is Not A Number");

        // Find requested user by primary key (id)
        await Utilisateur.findByPk(req.params.id, {
            attributes: { exclude: ["motDePasse"] },
        })
            .then((poste) => res.json(poste))
            .catch((err) => res.status(500).json({ error: err.message }));
    } catch (err: any) {
        // return client error if wrong id has been given
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
}

/**
 * User creation for POST route
 * @param req Request (body used to create new user)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function createUtilisateur(req: Request, res: Response) {
    //TODO: Setup true data checking
    checkExistingId<Poste>(req.body.posteId, Poste)
        .catch((err) =>
            res.status(400).json({
                status: "error",
                message: err.message,
            })
        )
        .then(() => checkExistingUtilisateur(req))
        .catch((err) =>
            res.status(409).json({
                status: "error",
                message: err.message,
            })
        )
        .then(() => {
            // Clean useless creation and update dates if given (setup while creating user)
            req.body.createdAt = null;
            req.body.updatedAt = null;
            hash(req.body.motDePasse, 10)
                .then((hash) => (req.body.motDePasse = hash))
                .then(() => {
                    Utilisateur.create(req.body);
                });
        })
        .catch((err) => res.status(500).json({ error: err.message }))
        .then((u) => res.json(u));
    // return client error if wrong id has been given
}

/**
 * User update for PUT route
 * @param req Request (body used to update user)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function updateUtilisateur(req: Request, res: Response) {
    // Check is given name is not empty and if given user or user id doesn't already exist
    // TODO : Add more checks if necessary
    checkExistingId<Utilisateur>(req.body.id, Utilisateur)
        .catch((err) =>
            res.status(400).json({
                status: "error",
                message: err.message,
            })
        )
        .then(() => checkExistingUtilisateur(req))
        .catch((err) =>
            res.status(409).json({
                status: "error",
                message: err.message,
            })
        )
        .then(() => {
            // Clean useless update dates if given (setup while creating user)
            req.body.updatedAt = null;
            hash(req.body.motDePasse, 10)
                .then((hash) => (req.body.motDePasse = hash))
                .then(() => {
                    Utilisateur.update(req.body, {
                        where: { id: req.body.id },
                    });
                });
        })
        .then((u) => res.status(200).json(u))
        .catch((err) => res.status(500).json(err));
}

/**
 * User remove for DELETE route
 * @param req Request (parameter "id" used to find user to delete)
 * @param res :
 *  - 200 confirmation
 *  - 401 error if given id is NaN or doesn't exist
 *  - 500 error for database error
 */
async function deleteUtilisateurById(req: Request, res: Response) {
    try {
        // Check if requested user id exist in database
        await checkExistingId<Utilisateur>(
            parseInt(req.params.id),
            Utilisateur
        );

        // Delete requested user by its id
        await Utilisateur.destroy({ where: { id: req.params.id } })
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    } catch (err: any) {
        // return client error if wrong informations have been given
        res.status(401).json({
            status: "error",
            message: err.message,
        });
    }
}

export default utilisateurController;
