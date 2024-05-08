import { Request, Response } from 'express'
import Companies from '../models/company.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidCompany } from '../validator/company.validator'
import Addresses from '../models/address.model'

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
        const identifier = parseInt(req.params.companyId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

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
    try {
        console.log(req.body.company.addressId + "\n")
        // Parse identifier for address link
        const identifier = parseInt(req.body.company.addressId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        // Try to find the linked address
        const address = await Addresses.findByPk(identifier)
        if (!address) throw createHttpError(404, 'Unable to find the linked address.')

        // Test params
        const validator = isValidCompany(req.body.company.name, req.body.company.legalEntity)
        if (!validator.valid) {
            throw createHttpError(400, validator.message as string)
        }

        // Insert in database
        const company = await Companies.create({
            name: req.body.company.name,
            legalEntity: req.body.company.legalEntity,
            addressId: identifier
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                companyId: company.companyId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update a company
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        const identifier = parseInt(req.params.companyId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const company = await Companies.findByPk(identifier)
        if (!company) throw createHttpError(404, 'Company not found')

        // Identify address
        const idAddress = parseInt(req.body.company.addressId)
        if (isNaN(idAddress)) throw createHttpError(400, 'Please provide a valid address identifier')

        const address = await Addresses.findByPk(idAddress)
        if (!address) throw createHttpError(404, 'Address not found')

        const validator = isValidCompany(req.body.company.name, req.body.company.legalEntity)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Companies.update(req.body.company, {
            where: {
                companyId: identifier
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

/**
 * Delete a company
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        const identifier = parseInt(req.params.companyId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const company = await Companies.findByPk(identifier)
        if (!company) throw createHttpError(404, 'Company not found')

        await Companies.destroy({
            where: {
                companyId: identifier
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

const companyController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default companyController
