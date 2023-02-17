import { Request, Response } from "express";
import { Poste } from "../models/poste.model";
import { Op } from "sequelize";

const posteController = {
  getAllPostes,
  getPosteById,
  createPoste,
};

async function getAllPostes(req: Request, res: Response) {
  await Poste.findAll().then((poste) => res.json(poste));
}

async function getPosteById(req: Request, res: Response) {
  await Poste.findByPk(req.params.id)
    .then((poste) => res.json(poste))
    .catch((err) => res.status(500).json({ error: err.message }));
}

async function createPoste(req: Request, res: Response) {
  // Avoid void role name
  if (req.body.nom === "" || undefined || null) {
    return res.status(400).json({ error: "Empty role name provided" });
  }

  // Avoid creating existing role
  const existingPoste = await Poste.findOne({
    where: {
      [Op.or]: [{ nom: req.body.nom }, { description: req.body.description }],
    },
  });
  if (existingPoste !== null) {
    return res.status(400).json({ error: "This role seems to already exist" });
  }

  // Reset dates if specified
  req.body.createdAt = null;
  req.body.updatedAt = null;

  // TODO: Setup validator ("express-validator" package?) to verify whole body

  // Create role
  await Poste.create(req.body)
    .then((poste) => res.json(poste))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default posteController;
