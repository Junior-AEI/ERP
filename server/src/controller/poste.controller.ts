import { Request, Response } from "express";
import { Poste } from "../models/poste.model";
import { Op } from "sequelize";
import { truncate } from "lodash";

const posteController = {
  getAllPostes,
  getPosteById,
  createPoste,
  // updatePoste,
};

// TODO: Setup validator ("express-validator" package?) to verify whole body
/**
 * Avoid empty role name
 */
async function checkEmptyName(req: Request) {
  if (
    req.body.nom === "" ||
    req.body.nom === undefined ||
    req.body.nom === null
  ) {
    throw new Error("Empty name provided");
  }
}

/**
 * Avoid creating existing role
 */
async function checkExistingPoste(req: Request): Promise<void> {
  const existingPoste = await Poste.findOne({
    where: {
      [Op.or]: [{ nom: req.body.nom }, { description: req.body.description }],
    },
  });
  if (existingPoste !== null) throw new Error("Role already exist");
}

async function getAllPostes(req: Request, res: Response) {
  await Poste.findAll().then((poste) => res.json(poste));
}

async function getPosteById(req: Request, res: Response) {
  await Poste.findByPk(req.params.id)
    .then((poste) => res.json(poste))
    .catch((err) => res.status(500).json({ error: err.message }));
}

/**
 * Role creation for POST route
 * @param req Request
 * @param res Reply
 */
async function createPoste(req: Request, res: Response) {
  try {
    await checkEmptyName(req);
    await checkExistingPoste(req);

    // Clean useless creation and update dates if given (setup while creating role)
    req.body.createdAt = null;
    req.body.updatedAt = null;

    await Poste.create(req.body)
      .then((poste) => res.status(200).json(poste))
      .catch((err) => res.status(500).json(err));
  } catch (err: any) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
}

export default posteController;
