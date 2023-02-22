import { Request, Response } from "express";
import { Adresse } from "../models/adresse.model";
import { Op } from "sequelize";
import { checkExistingId } from "./utils.controller";

const adresseController = {
  getAllAdresses,
  getAdresseById,
  createAdresse,
  updateAdresse,
  deleteAdresseById,
};

// TODO: Setup validator ("express-validator" package?) to verify whole body

/**
 * Throws error if a role already exist in database
 * @param req Request to check (req.body used)
 */
// async function checkExistingAdresse(req: Request): Promise<void> {
//   // if id isn't given (case of new role creation), set it to "null" (avoid database error)
//   if (req.body.id === undefined) req.body.id = null;

//   // Check is given role isn't already in database with another id
//   const existingAdresse = await Adresse.findOne({
//     where: {
//       [Op.and]: [
//         { [Op.not]: { id: req.body.id } },
//         {
//           [Op.or]: [
//             { nom: req.body.nom },
//             { description: req.body.description },
//           ],
//         },
//       ],
//     },
//   });
//   if (existingAdresse !== null) throw new Error("Role already exist");
// }

/**
 * All roles reader for GET route
 * @param res
 *  - Roles in database
 *  - 500 error
 */
async function getAllAdresses(req: Request, res: Response) {
  await Adresse.findAll().then((adresse) => res.json(adresse));
}

/**
 * Specific role (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right role)
 * @param res
 *  - Requested role
 *  - 401 error if "id" is NaN
 *  - 500 error for database error
 */
async function getAdresseById(req: Request, res: Response) {
  try {
    // Check if req.params.id is a number
    if (Number.isNaN(req.params.id))
      throw new Error("Given id is Not A Number");

    // Find requested role by primary key (id)
    await Adresse.findByPk(req.params.id)
      .then((adresse) => res.json(adresse))
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
 * Role creation for POST route
 * @param req Request (body used to create new role)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function createAdresse(req: Request, res: Response) {
  try {
    // Check is given name is not empty and if given post doesn't already exist
    // await checkEmptyName(req.body.nom);
    // await checkExistingAdresse(req);

    // Clean useless creation and update dates if given (setup while creating role)
    req.body.createdAt = null;
    req.body.updatedAt = null;

    // Create new role from given body
    await Adresse.create(req.body)
      .then((adresse) => res.status(200).json(adresse))
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
 * Role update for PUT route
 * @param req Request (body used to update role)
 * @param res
 *  - 200 confirmation
 *  - 401 error if wrong datas are given
 *  - 500 error for database error
 */
async function updateAdresse(req: Request, res: Response) {
  try {
    // Check is given name is not empty and if given role or role id doesn't already exist
    // await checkEmptyName(req.body.nom);
    await checkExistingId<Adresse>(req.body.id, Adresse);
    // await checkExistingAdresse(req);

    // Clean useless update dates if given (setup while creating role)
    req.body.updatedAt = null;

    // Update requested role with given body
    await Adresse.update(req.body, { where: { id: req.body.id } })
      .then((adresse) => res.status(200).json(adresse))
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
 * Role remove for DELETE route
 * @param req Request (parameter "id" used to find role to delete)
 * @param res :
 *  - 200 confirmation
 *  - 401 error if given id is NaN or doesn't exist
 *  - 500 error for database error
 */
async function deleteAdresseById(req: Request, res: Response) {
  try {
    // Check if requested role id exist in database
    await checkExistingId<Adresse>(parseInt(req.params.id), Adresse);

    // Delete requested role by its id
    await Adresse.destroy({ where: { id: req.params.id } })
      .then((adresse) => res.status(200).json(adresse))
      .catch((err) => res.status(500).json(err));
  } catch (err: any) {
    // return client error if wrong informations have been given
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
}

export default adresseController;
