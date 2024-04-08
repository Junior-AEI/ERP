import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import Users from '../models/user.model'
import { HttpError } from 'http-errors'
import { isValidUser } from '../validator/user.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'
import Members from '../models/member.model'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll({
            attributes: {
                exclude: ['password']
            }
        })

        return res.status(200).json({
            status: 'success',
            data: {
                users: users
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
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.userId)

        const user = await Users.findByPk(identifier, {
            attributes: {
                exclude: ['password']
            }
        })

        if (!user) throw createHttpError(404, 'User not found')

        return res.status(200).json({
            status: 'success',
            data: {
                user: user
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
        // Parse identifier for member heredity
        if (req.body.user.memberId && !isNumber(req.body.user.memberId)) throw createHttpError(400, 'Please provide a valid identifier for the linked member.')
        const identifier = parseInt(req.body.user.memberId)

        // Test params
        const validator = isValidUser(req.body.user.username, req.body.user.password, req.body.user.mandateStart, req.body.user.emailJE)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Try to find the linked member
        const member = await Members.findByPk(identifier)
        if (!member) return createHttpError(404, 'Unable to find the linked member.')

        // Insert data
        const user = await Users.create({
            userId: identifier,
            username: req.body.user.username,
            password: req.body.user.password,
            mandateStart: req.body.user.mandateStart,
            emailJE: req.body.user.emailJE
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                userId: user.userId
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
        // Parse identifier
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.userId)

        const user = await Users.findByPk(identifier)
        if (!user) throw createHttpError(404, 'User not found')

        const validator = isValidUser(req.body.user.username, req.body.user.password, req.body.user.mandateStart, req.body.user.emailJE)

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        const encryptedPassword = bcrypt.hash(req.body.password, 10)
        req.body.user.updatedAt = null
        req.body.user.password = encryptedPassword

        await Users.update(req.body, {
            where: { userId: identifier }
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
        // Parse identifier
        if (req.params.userId && !isNumber(req.params.userId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.userId)

        const user = await Users.findByPk(identifier)
        if (!user) throw createHttpError(404, 'User not found')

        await Users.destroy({
            where: {
                userId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const userController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default userController
