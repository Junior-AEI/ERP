import { Request, Response } from 'express'
import Companies from '../models/company.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidCompany } from '../validator/company.validator'

/**
 * Get all companies
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const companies = await Companies.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                companies: companies
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific company
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.companyId && !isNumber(req.params.companyId))
            throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.companyId)

        const company = await Companies.findByPk(identifier)

        if (!company) throw createHttpError(404, 'Company not found')

        return res.status(200).json({
            status: 'success',
            data: {
                company: company
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a company
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    
    // Test params
    const validator = isValidCompany(req.body.company.name, req.body.company.legalEntity);
    if(!validator.valid) return createHttpError(400, validator.message as string);

    // Insert in database
    const company = await Companies.create({
        name: req.body.company.name,
        legalEntity: req.body.company.legalEntity
    });

    // Return success
    return res.status(200).json({
        status: 'success',
        data: {
            companyId: company.companyId
        }
    });

}

/**
 * Update a company
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.companyId && !isNumber(req.params.companyId))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.companyId)

        const company = await Companies.findByPk(identifier)
        if (!company) throw createHttpError(404, 'User not found')

        const validator = isValidCompany(req.body.company.name, req.body.company.legalEntity)

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Companies.update(req.body, {
            where: { companyId: identifier }
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
 * Delete a company
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.companyId && !isNumber(req.params.companyId))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.companyId)

        const company = await Companies.findByPk(identifier)
        if (!company) throw createHttpError(404, 'User not found')

        await Companies.destroy({
            where: {
                companyId: req.body.company.companyId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const companyController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default companyController
