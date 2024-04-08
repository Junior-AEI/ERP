import { Request, Response } from 'express'
import Adresses from '../models/address.model'
import { controllerErrorHandler, isNumber } from './utils.controller'
import createHttpError, { HttpError } from 'http-errors'
import { isValidAddress } from '../validator/address.validator'
import Addresses from '../models/address.model'

/**
 * Get all addresses
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const addresses = await Adresses.findAll()
        return res.status(200).json(addresses)
    } catch (err) {
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }

        throw err
    }
}

/**
 * Get a specific address
 * @param req 
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.id)

        // Find requested member by primary key (id)
        const address = await Adresses.findByPk(identifier)

        if (!address) return createHttpError(404, 'Address not found.')

        // Return the found address
        return res.status(200).json({
            status: 'success',
            data: {
                address: address
            }
        })
    } catch (err) {
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
    }
}

/**
 * Create an address
 * @param async
 */
const create = async (req: Request, res: Response) => {
    try {
        const validator = isValidAddress(
            req.body.address.address,
            req.body.address.additionnalAddress,
            req.body.address.city,
            req.body.address.postCode,
            req.body.address.country
        )

        if (validator.valid !== 1) throw createHttpError(400, validator.message as string)

        req.body.address.createdAt = null
        req.body.address.updatedAt = null

        const address = await Addresses.create(req.body.address)

        return res.status(200).json({
            status: 'success',
            data: {
                addressId: address.addressId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
    }
}

/**
 * Update address
 * @param req
 * @param res
 */
async function update(req: Request, res: Response) {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.id)

        const validator = isValidAddress(
            req.body.address.address,
            req.body.address.additionnalAddress,
            req.body.address.city,
            req.body.address.postCode,
            req.body.address.country
        )

        if (validator.valid !== 1) throw createHttpError(400, validator.message as string)

        req.body.address.createdAt = null
        req.body.address.updatedAt = null

        await Addresses.update(req.body.address, {
            where: { addressId: identifier }
        })

        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) {
            return controllerErrorHandler(err, res)
        }
        throw err
    }
}

/**
 * Delete an address
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.id)

        const address = await Addresses.findByPk(identifier)
        if (!address) throw createHttpError(404, 'Address not found.')

        await Addresses.destroy({
            where: {
                userId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const AddressController = {
    getAll,
    getByPk,
    create,
    update,
    del
}

export default AddressController
