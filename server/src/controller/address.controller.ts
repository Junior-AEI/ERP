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
        if (req.params.addressId && !isNumber(req.params.addressId)) throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.addressId)

        // Find
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
        // Test params
        const validator = isValidAddress(req.body.address.address, req.body.address.additionnalAddress, req.body.address.city, req.body.address.postCode, req.body.address.country)

        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const address = await Addresses.create({
            address: req.body.address.address,
            additionnalAddress: req.body.address.additionnalAddress,
            city: req.body.address.city,
            postCode: req.body.address.postCode,
            country: req.body.address.country
        })

        // Return success
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
        if (req.params.addressId && !isNumber(req.params.addressId)) throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.addressId)

        // Test params
        const validator = isValidAddress(req.body.address.address, req.body.address.additionnalAddress, req.body.address.city, req.body.address.postCode, req.body.address.country)

        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        await Addresses.update(
            {
                address: req.body.address.address,
                additionnalAddress: req.body.address.additionnalAddress,
                city: req.body.address.city,
                postCode: req.body.address.postCode,
                country: req.body.address.country
            },
            {
                where: { addressId: identifier }
            }
        )

        // Return success
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
        if (req.params.addressId && !isNumber(req.params.addressId)) throw createHttpError(400, 'Please provide a valid identifier.')
        const identifier = parseInt(req.params.addressId)

        const address = await Addresses.findByPk(identifier)
        if (!address) throw createHttpError(404, 'Address not found.')

        await Addresses.destroy({
            where: {
                addressId: identifier
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
