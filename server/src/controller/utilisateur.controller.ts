import { Request, Response } from "express";
import { Utilisateur } from "../models/utilisateur.model";

const utilisateurController = {
  getAllUtilisateurs,
  addUtilisateur,
  deleteUtilisateur,
};

/**
 * All utilisateurs reader for GET route
 * @param res
 *  - Utilisateurs in database
 *  - 500 error
 */
async function getAllUtilisateurs(req: Request, res: Response) {
  await Utilisateur.findAll({ attributes: { exclude: ["motDePasse"] } }).then(
    (users) => res.json(users)
  );
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
