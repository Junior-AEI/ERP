import { Request, Response } from "express";
import { Adherent } from "../models/adherent.model";
import { Adresse } from "../models/adresse.model";
import { checkExistingId } from "./utils.controller";
import { Op } from "sequelize";

const adherentController = {
  getAllAdherents,
  getAdherentById,
  createAdherent,
  deleteAdherentById,
  updateAdherent,
};

/**
 * Throws error if a user already exist in database
 * @param req Request to check (req.body used)
 */
// async function checkExistingAdherent(req: Request): Promise<void> {
// if id isn't given (case of new user creation), set it to "null" (avoid database error)
// if (req.body.id === undefined) req.body.id = null;

// Check is given user isn't already in database with another id
//   const existingAdherent = await Adherent.findOne({
//     where: {
//       [Op.and]: [
//         { [Op.not]: { id: req.body.id } },
//         {
//           [Op.or]: [
//             { nomAdherent: req.body.nomAdherent },
//             { mailJE: req.body.mailJE },
//           ],
//         },
//       ],
//     },
//   });
//   if (existingAdherent !== null) throw new Error("User already exist");
// }

/**
 * All user reader for GET route
 * @param res
 *  - Adherents in database
 *  - 500 error
 */
async function getAllAdherents(req: Request, res: Response) {
  await Adherent.findAll({ attributes: { exclude: ["motDePasse"] } }).then(
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
async function getAdherentById(req: Request, res: Response) {
  try {
    // Check if req.params.id is a number
    if (Number.isNaN(parseInt(req.params.id)))
      throw new Error("Given id is Not A Number");

    // Find requested user by primary key (id)
    await Adherent.findByPk(req.params.id, {
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
async function createAdherent(req: Request, res: Response) {
  try {
    //TODO: Setup true data checking
    // await checkExistingId<Adresse>(req.body.posteId, Adresse);
    // await checkExistingAdherent(req);

    // Clean useless creation and update dates if given (setup while creating user)
    // req.body.createdAt = null;
    // req.body.updatedAt = null;

    await Adherent.create(req.body)
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

/**
 * User update for PUT route
 * @param req Request (body used to update user)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function updateAdherent(req: Request, res: Response) {
  try {
    // Check is given name is not empty and if given user or user id doesn't already exist
    // TODO : Add more checks if necessary
    await checkExistingId<Adherent>(req.body.id, Adherent);
    // await checkExistingAdherent(req);
    // Clean useless update dates if given (setup while creating user)
    req.body.updatedAt = null;

    // Update requested user with given body
    await Adherent.update(req.body, { where: { id: req.body.id } })
      .then((u) => res.status(200).json(u))
      .catch((err) => res.status(500).json(err));
  } catch (err: any) {
    // return client error if wrong informations have been given
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
}

/**
 * User remove for DELETE route
 * @param req Request (parameter "id" used to find user to delete)
 * @param res :
 *  - 200 confirmation
 *  - 401 error if given id is NaN or doesn't exist
 *  - 500 error for database error
 */
async function deleteAdherentById(req: Request, res: Response) {
  try {
    // Check if requested user id exist in database
    await checkExistingId<Adherent>(parseInt(req.params.id), Adherent);

    // Delete requested user by its id
    await Adherent.destroy({ where: { id: req.params.id } })
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

export default adherentController;
