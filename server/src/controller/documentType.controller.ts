import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import DocumentTypes from '../models/documentType.model'
import { HttpError } from 'http-errors'
import { isValidDocumentType } from '../validator/documentType.validator'
import { controllerErrorHandler } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const documentTypes = await DocumentTypes.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                documentTypes: documentTypes
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific user
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.typeId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const documentType = await DocumentTypes.findByPk(identifier)
        if (!documentType) throw createHttpError(404, 'Document Type not found')

        return res.status(200).json({
            status: 'success',
            data: {
                documentType: documentType
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create an user
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // Test params
        const validator = isValidDocumentType(req.body.documentType.type, req.body.documentType.fieldNumber, req.body.documentType.fieldMeaning)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const documentType = await DocumentTypes.create({
            type: req.body.documentType.type,
            fieldNumber: req.body.documentType.fieldNumber,
            fieldMeaning: req.body.documentType.fieldMeaning
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                typeId: documentType.typeId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update an user
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.typeId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const documentType = await DocumentTypes.findByPk(identifier)
        if (!documentType) throw createHttpError(404, 'Document Type not found')

        const validator = isValidDocumentType(req.body.documentType.type, req.body.documentType.fieldNumber, req.body.documentType.fieldMeaning)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await DocumentTypes.update(req.body.documentType, {
            where: { typeId: identifier }
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
 * Delete an user
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.typeId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const documentType = await DocumentTypes.findByPk(identifier)
        if (!documentType) throw createHttpError(404, 'Document Type not found')

        await DocumentTypes.destroy({
            where: {
                typeId: identifier
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

const documentTypeController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default documentTypeController
