import { Request, Response } from "express";
import { Adherent } from "../models/adherent.model";
import { Adresse } from "../models/adresse.model";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";
import { Op } from "sequelize";

const adherentController = {
    getAllAdherents,
    getAdherentById,
    createAdherent,
    deleteAdherentById,
    updateAdherent,
};

/**
 * Throws error if a subscriber already exist in database
 * @param req Request to check (req.body used)
 */
// async function checkExistingAdherent(req: Request): Promise<void> {
// if id isn't given (case of new subscriber creation), set it to "null" (avoid database error)
// if (req.body.id === undefined) req.body.id = null;

// Check is given subscriber isn't already in database with another id
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
//   if (existingAdherent !== null) throw new Error("subscriber already exist");
// }

/**
 * All subscribers reader for GET route
 * @param res :
 *  - Subscribers in database + 200 confirmation
 *  - 500 error
 */
async function getAllAdherents(req: Request, res: Response) {
    await Adherent.findAll({ attributes: { exclude: ["motDePasse"] } })
        .then((subscriber) => res.status(200).json(subscriber))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific subscriber (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right subscriber)
 * @param res :
 *  - Requested subscriber + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getAdherentById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested subscriber by primary key (id)
            Adherent.findByPk(req.params.id, {
                attributes: { exclude: ["motDePasse"] },
            })
        )
        .then((adherent) => res.status(200).json(adherent))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Subscriber creation for POST route
 * @param req Request (body used to create new subscriber)
 * @param res :
 *  - 201 confirmation
 *  - 400 error if wrong datas are given
 *  - 409 error if role already exist
 *  - 500 error for database error
 */
async function createAdherent(req: Request, res: Response) {
    //TODO: Setup true data checking
    // await checkExistingId<Adresse>(req.body.posteId, Adresse);
    // await checkExistingAdherent(req);

    // Clean useless creation and update dates if given (setup while creating subscriber)
    // req.body.createdAt = null;
    // req.body.updatedAt = null;

    await Adherent.create(req.body)
        .then((adherent) => res.status(201).json(adherent))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Subscriber update for PUT route
 * @param req Request (body used to update subscriber)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if wrong datas are given
 *  - 404 error if subscriber don't exist
 *  - 500 error for database error
 */
async function updateAdherent(req: Request, res: Response) {
    // Check is given name is not empty and if given subscriber or subscriber id doesn't already exist
    // TODO : Add more checks if necessary
    await checkExistingId<Adherent>(req.body.id, Adherent)
        // .then(() => checkExistingAdherent(req))
        .then(() => {
            // Clean useless update dates if given (setup while creating subscriber)
            req.body.updatedAt = null;
            // Update requested subscriber with given body
            return Adherent.update(req.body, { where: { id: req.body.id } });
        })
        .then((adherent) => res.status(204).json(adherent))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Subscriber remove for DELETE route
 * @param req Request (parameter "id" used to find subscriber to delete)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteAdherentById(req: Request, res: Response) {
    // Check if requested subscriber id exist in database
    await checkExistingId<Adherent>(req.params.id, Adherent)
        .then(() =>
            // Delete requested subscriber by its id
            Adherent.destroy({ where: { id: req.params.id } })
        )
        .then((subscriber) => res.status(204).json(subscriber))
        .catch((err) => controllerErrorHandler(err, res));
}

export default adherentController;
