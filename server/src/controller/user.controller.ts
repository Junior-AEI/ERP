import { Request, Response } from "express";
import { Utilisateur } from "../models/utilisateur.model";
const userController = {
  getUtilisateur,
  addUtilisateur,
  deleteUtilisateur,
};

async function getUtilisateur(req: Request, res: Response) {
  await Utilisateur.findAll().then((users) => res.json(users));
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

export default userController;
