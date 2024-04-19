import { Request, Response } from 'express'
import Members from '../models/member.model'
import { isNumber, controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidMember } from '../validator/member.validator'
import Persons from '../models/person.model'

/**
 * Get all members
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const members = await Members.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                members: members
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Get a specific member
 * @param req
 * @param res
 * @returns
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.memberId)

        const member = await Members.findByPk(identifier)

        if (!member) throw createHttpError(404, 'Member not found')

        return res.status(200).json({
            status: 'success',
            data: {
                member: member
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a member
 * @param req
 * @param res
 */
const create = async (req: Request, res: Response) => {
    try {
        // Parse identifier for person heredity
        if (req.body.member.personId && !isNumber(req.body.member.memberId)) throw createHttpError(400, 'Please provide a valid identifier for the linked person.')
        const identifier = parseInt(req.body.member.personId)

        // Test params
        const validator = isValidMember(req.body.member.birthDate, req.body.member.birthPlace, req.body.member.nationality, req.body.member.promotion, req.body.member.contributionDate, req.body.member.department, req.body.member.membershipNumber)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Try to find linked person
        const person = Persons.findByPk(identifier)
        if (!person) throw createHttpError(404, 'Unable to find linked person.')

        // Insert data
        const member = await Members.create({
            memberId: identifier,
            birthDate: req.body.member.birthDate,
            birthPlace: req.body.member.birthPlace,
            nationality: req.body.member.nationality,
            promotion: req.body.member.promotion,
            contributionDate: req.body.member.contributionDate,
            department: req.body.member.department,
            membershipNumber: req.body.member.membershipNumber
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                memberId: member.memberId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update a member
 * @param req
 * @param res
 * @returns
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.memberId)

        const member = await Members.findByPk(identifier)
        if (!member) throw createHttpError(404, 'User not found')

        const validator = isValidMember(req.body.member.birthDate, req.body.member.birthPlace, req.body.member.nationality, req.body.member.promotion, req.body.member.contributionDate, req.body.member.department, req.body.member.membershipNumber)

        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Members.update(req.body, {
            where: { memberId: identifier }
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
 * Delete a member
 * @param req
 * @param res
 */
async function del(req: Request, res: Response) {
    try {
        // Parse identifier
        if (req.params.memberId && !isNumber(req.params.memberId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.memberId)

        const member = await Members.findByPk(identifier)
        if (!member) throw createHttpError(404, 'Member not found')

        await Members.destroy({
            where: {
                memberId: req.body.user.memberId
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const memberController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default memberController
