import { Request, Response } from "express";
import { Utilisateur } from "../models/utilisateur.model";
import posteController from "./poste.controller";
import { Op } from "sequelize";

const utilisateurController = {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  deleteUtilisateur,
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
  await Utilisateur.findAll({ attributes: { exclude: ["motDePasse"] } }).then(
    (users) => res.json(users)
  );
}

/**
 * Specific user (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right user)
 * @param res
 *  - Requested user
 *  - 401 error if "id" is NaN
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
    res.status(401).json({
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
  try {
    //TODO: Setup true data checking
    await posteController.checkExistingPosteId(req.body.posteId);
    await checkExistingUtilisateur(req);

    // Clean useless creation and update dates if given (setup while creating user)
    req.body.createdAt = null;
    req.body.updatedAt = null;

    await Utilisateur.create(req.body)
      .then(() => res.json(req.body))
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err: any) {
    // return client error if wrong id has been given
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
}

async function deleteUtilisateur(req: Request, res: Response) {
  await Utilisateur.destroy(req.body)
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default utilisateurController;
