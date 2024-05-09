import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Projects from '../models/project.model'
import { HttpError } from 'http-errors'
import { isValidProject } from '../validator/project.validator'
import { controllerErrorHandler } from './utils.controller'
import Clients from '../models/client.model'
import { Op } from 'sequelize';

/**
 * Get all projects
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const projects = await Projects.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                projects: projects
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const getAllActive = async (req: Request, res: Response) => {
    try {
        
        const activProjects = await Projects.findAll({
            where: {
                endDate: { [Op.gt]: new Date() }
            }
        })

        return res.status(200).json({
            status: 'success',
            data: {
                projects: activProjects
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err

    }
    console.log('getAllActive [53]');
    
}



// function parseFilterValue(field: string, value: string): any {
//     const operators = {
//         '=': Op.eq,
//         '!=': Op.ne,
//         '>': Op.gt,
//         '>=': Op.gte,
//         '<': Op.lt,
//         '<=': Op.lte,
//         'between': Op.between,
//         'in': Op.in,
//         'like': Op.like,
//         'not like': Op.notLike
//         // 'is null': Op.isNull,
//         // 'is not null': Op.notNull
//     };

//     // Vérifier si la valeur contient un opérateur
//     const operatorMatch = value.match(/^(\S+)\s+(.+)$/);
//     if (operatorMatch) {
//         const [operator, operand] = operatorMatch;

//         // Vérifier si l'opérateur est pris en charge
//         if (operators[operator]) {
//             // Vérifier si l'opérande est une date
//             if (operator === 'between' && field === 'startDate' || field === 'endDate') {
//                 // Convertir l'opérande en tableau de dates
//                 const [start, end] = operand.split(' and ').map(date => new Date(date));
//                 return { [field]: { [operators[operator]]: [start, end] } };
//             } else if (operator === 'in' && field === 'status') {
//                 // Convertir l'opérande en tableau de statuts
//                 return { [field]: { [operators[operator]]: operand.split(',') } };
//             } else if (operator === 'like') {
//                 // Ajouter des caractères génériques autour de l'opérande
//                 return { [field]: { [operators[operator]]: `%${operand}%` } };
//             } else {
//                 // Convertir l'opérande en valeur appropriée
//                 const value = operator === 'is null' ? null : operand;
//                 return { [field]: { [operators[operator]]: value } };
//             }
//         } else {
//             throw new Error(`Unknown operator '${operator}'`);
//         }
//     } else {
//         // Vérifier si la valeur est une chaîne de caractères spéciale
//         if (value === 'gt today') {
//             // Vérifier si le champ est une date
//             if (field === 'startDate' || field === 'endDate') {
//                 // Retourner une condition de requête pour rechercher les dates supérieures à la date actuelle
//                 return { [field]: { [Op.gt]: new Date() } };
//             } else {
//                 throw new Error(`Cannot use 'gt today' filter with field '${field}'`);
//             }
//         } else {
//             // Retourner une condition de requête pour rechercher les chaînes de caractères contenant la valeur spécifiée
//             return { [field]: { [Op.like]: `%${value}%` } };
//         }
//     }
// }


const search = async (req: Request, res: Response) => {
    try {
        const filters = req.body.filters;

        // Définir les conditions de la requête en fonction des propriétés de l'objet filters
        const conditions: any = {};
        if (filters.projectId) {
            conditions.projectId = { $like: `%${filters.projectId}%` };
        }
        if (filters.acronym) {
            conditions.acronym = { $like: `%${filters.acronym}%` };
        }
        if (filters.startDate) {
            conditions.startDate = { $like: `%${filters.startDate}%` };
        }
        if (filters.endDate) {
            conditions.endDate = { $like: `%${filters.endDate}%` };
        }
        if (filters.clientId) {
            conditions.clientId = { $like: `%${filters.clientId}%` };
        }

        // Si aucun filtre n'est spécifié, retourner tous les projets
        if (Object.keys(conditions).length === 0) {
            const projects = await Projects.findAll();
            return res.status(200).json({
                status: 'success',
                data: {
                    projects: projects
                }
            });
        }

        // Sinon, effectuer la recherche avec les filtres spécifiés
        const projects = await Projects.findAll({
            where: conditions
        });

        return res.status(200).json({
            status: 'success',
            data: {
                projects: projects
            }
        });
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}


/**
 * Select a specific project
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        return res.status(200).json({
            status: 'success',
            data: {
                project: project
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create an project
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        const identifier = parseInt(req.body.project.clientId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid client identifier')

        // Try to find the linked client
        const client = await Clients.findByPk(identifier)
        if (!client) throw createHttpError(404, 'Unable to find the linked client.')

        // Test params
        const validator = isValidProject(req.body.project.name, req.body.project.acronym, req.body.project.startDate, req.body.project.endDate)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const project = await Projects.create({
            clientId: identifier,
            name: req.body.project.name,
            acronym: req.body.project.acronym,
            startDate: new Date(req.body.project.startDate),
            endDate: new Date(req.body.project.endDate)
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                projectId: project.projectId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update an project
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        // parse client identifier
        const idClient = parseInt(req.body.project.clientId)
        if (isNaN(idClient)) throw createHttpError(400, 'Please provide a valid client identifier')

        // Try to find the linked client
        const client = await Clients.findByPk(idClient)
        if (!client) throw createHttpError(404, 'Unable to find the linked client.')

        // Test params
        const validator = isValidProject(req.body.project.name, req.body.project.acronym, req.body.project.startDate, req.body.project.endDate)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        await Projects.update(req.body.project, {
            where: { projectId: identifier }
        })

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Delete an project
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.projectId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const project = await Projects.findByPk(identifier, {})
        if (!project) throw createHttpError(404, 'Project not found')

        await Projects.destroy({
            where: {
                projectId: identifier
            }
        })

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const projectController = {
    getAll,
    getByPk,
    getAllActive,
    search,
    create,
    del,
    update
}

export default projectController
