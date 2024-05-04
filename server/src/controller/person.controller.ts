import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Persons from '../models/person.model'
import { HttpError } from 'http-errors'
import { isValidPerson } from '../validator/person.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const persons = await Persons.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                persons: persons
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
        if (req.params.personId && !isNumber(req.params.personId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.personId)

        const person = await Persons.findByPk(identifier, { })

        if (!person) throw createHttpError(404, 'User not found')

        return res.status(200).json({
            status: 'success',
            data: {
                person: person
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
        const validator = isValidPerson(req.body.person.lastname,
                                        req.body.person.firstname,
                                        req.body.person.gender,
                                        req.body.person.mobilePhone,
                                        req.body.person.email
            )
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const person = await Persons.create({
            lastname: req.body.person.lastname,
            firstname: req.body.person.firstname,
            gender: req.body.person.gender,
            mobilePhone: req.body.person.mobilePhone,
            landlinePhone: req.body.person.landlinePhone,
            email: req.body.person.email
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                personId: person.personId
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
        if (req.params.personId && !isNumber(req.params.personId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.personId)

        const person = await Persons.findByPk(identifier)
        if (!person) throw createHttpError(404, 'User not found')

        const validator = isValidPerson(req.body.person.lastname,
            req.body.person.firstname,
            req.body.person.gender,
            req.body.person.mobilePhone,
            req.body.person.email
        )
        if (validator.valid == 0) throw createHttpError(400, validator.message as string)


        await Persons.update(req.body, {
            where: { personId: identifier }
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

        const person = await Persons.findByPk(identifier)
        if (!person) throw createHttpError(404, 'User not found')

        await Persons.destroy({
            where: {
                userId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const personController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default personController
