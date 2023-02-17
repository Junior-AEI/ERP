import { Request, Response } from "express";
import { Poste } from "../models/poste.model";
import { Op } from "sequelize";

const posteController = {
  getAllPostes,
  getPosteById,
  createPoste,
  updatePoste,
  deletePosteById,
};

// TODO: Setup validator ("express-validator" package?) to verify whole body
/**
 * Avoid empty role name
 */
async function checkEmptyName(name: string) {
  if (name === "" || name === undefined || name === null) {
    throw new Error("Empty name provided");
  }
}

/**
 * Throws error if given role id does not exist or isn't valid
 * @param id Role id to check
 */
async function checkExistingId(id: number) {
  if (Number.isNaN(id)) throw new Error("Giver id is Not A Number");
  const existingPoste = await Poste.findByPk(id);
  if (existingPoste === null)
    throw new Error("Wrong role id or role doesn't exist");
}

/**
 * Avoid creating existing role
 */
async function checkExistingPoste(req: Request): Promise<void> {
  if (req.body.id === undefined) req.body.id = null;
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
    await checkEmptyName(req.body.nom);
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

/**
 * Role update for PUT route
 * @param req Request
 * @param res Response
 */
async function updatePoste(req: Request, res: Response) {
  try {
    await checkEmptyName(req.body.nom);
    await checkExistingId(req.body.id);
    await checkExistingPoste(req);

    // Clean useless update dates if given (setup while creating role)
    req.body.updatedAt = null;

    await Poste.update(req.body, { where: { id: req.body.id } })
      .then((poste) => res.status(200).json(poste))
      .catch((err) => res.status(500).json(err));
  } catch (err: any) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
}

/**
 * Role remove for DELETE route
 * @param req Request (parameter "id" used)
 * @param res Response
 */
async function deletePosteById(req: Request, res: Response) {
  try {
    await checkExistingId(parseInt(req.params.id));
    await Poste.destroy({ where: { id: req.params.id } })
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
