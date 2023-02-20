import { Request, Response } from "express";
import { Utilisateur } from "../models/utilisateur.model";

const utilisateurController = {
  getAllUtilisateurs,
  getUtilisateurById,
  addUtilisateur,
  deleteUtilisateur,
};

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

async function addUtilisateur(req: Request, res: Response) {
  await Utilisateur.create(req.body)
    .then(() => res.json(req.body))
    .catch((err) => res.status(500).json({ error: err.message }));
}

async function deleteUtilisateur(req: Request, res: Response) {
  await Utilisateur.destroy(req.body)
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default utilisateurController;
