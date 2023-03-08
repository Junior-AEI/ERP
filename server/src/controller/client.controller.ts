import { Request, Response } from "express";
import { Client } from "../models/client.model";
import { Entreprise } from "../models/entreprise.model";
import {
    checkExistingId,
    checkIdIsNotNaN,
    controllerErrorHandler,
} from "./utils.controller";
import { Op } from "sequelize";

const clientController = {
    getAllClients,
    getClientById,
    createClient,
    deleteClientById,
    updateClient,
};

/**
 * Throws error if a customer already exist in database
 * @param req Request to check (req.body used)
 */
// async function checkExistingClient(req: Request): Promise<void> {
// if id isn't given (case of new customer creation), set it to "null" (avoid database error)
// if (req.body.id === undefined) req.body.id = null;

// Check is given customer isn't already in database with another id
//   const existingClient = await Client.findOne({
//     where: {
//       [Op.and]: [
//         { [Op.not]: { id: req.body.id } },
//         {
//           [Op.or]: [
//             { nom: req.body.nom },
//             { mail: req.body.mail },
//           ],
//         },
//       ],
//     },
//   });
//   if (existingClient !== null) throw new Error("customer already exist");
// }

/**
 * All customers reader for GET route
 * @param res :
 *  - Customers in database + 200 confirmation
 *  - 500 error
 */
async function getAllClients(req: Request, res: Response) {
    await Client.findAll()
        .then((client) => res.status(200).json(client))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Specific customer (by id) reader for GET route
 * @param req Request ("id" parameter, needed to find right customer)
 * @param res :
 *  - Requested customer + 200 confirmation
 *  - 400 error if "id" is NaN
 *  - 500 error for database error
 */
async function getClientById(req: Request, res: Response) {
    // Check if req.params.id is a number
    await checkIdIsNotNaN(req.params.id)
        .then(() =>
            // Find requested customer by primary key (id)
            Client.findByPk(req.params.id)
        )
        .then((client) => res.status(200).json(client))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Customer creation for POST route
 * @param req Request (body used to create new customer)
 * @param res :
 *  - 201 confirmation
 *  - 400 error if wrong datas are given
 *  - 409 error if role already exist
 *  - 500 error for database error
 */
async function createClient(req: Request, res: Response) {
    //TODO: Setup true data checking
    // await checkExistingId<Entreprise>(req.body.entrepriseId, Entreprise);
    // await checkExistingClient(req);

    // Clean useless creation and update dates if given (setup while creating customer)
    // req.body.createdAt = null;
    // req.body.updatedAt = null;

    await Client.create(req.body)
        .then((client) => res.status(201).json(client))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Customer update for PUT route
 * @param req Request (body used to update customer)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if wrong datas are given
 *  - 404 error if customer don't exist
 *  - 500 error for database error
 */
async function updateClient(req: Request, res: Response) {
    // Check is given name is not empty and if given customer or customer id doesn't already exist
    // TODO : Add more checks if necessary
    await checkExistingId<Client>(req.body.id, Client)
        // .then(() => checkExistingClient(req))
        .then(() => {
            // Clean useless update dates if given (setup while creating customer)
            req.body.updatedAt = null;
            // Update requested customer with given body
            return Client.update(req.body, { where: { id: req.body.id } });
        })
        .then((client) => res.status(204).json(client))
        .catch((err) => controllerErrorHandler(err, res));
}

/**
 * Customer remove for DELETE route
 * @param req Request (parameter "id" used to find customer to delete)
 * @param res :
 *  - 200 confirmation
 *  - 400 error if given id is NaN
 *  - 404 error if given id doesn't exist
 *  - 500 error for database error
 */
async function deleteClientById(req: Request, res: Response) {
    // Check if requested customer id exist in database
    await checkExistingId<Client>(req.params.id, Client)
        .then(() =>
            // Delete requested customer by its id
            Client.destroy({ where: { id: req.params.id } })
        )
        .then((client) => res.status(204).json(client))
        .catch((err) => controllerErrorHandler(err, res));
}

export default clientController;