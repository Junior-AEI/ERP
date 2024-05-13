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
        const members = await Members.findAll()

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
        const identifier = parseInt(req.params.memberId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const member = await Members.findByPk(identifier)

        if (!member) throw createHttpError(404, 'Member not found')

        console.log(member);

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
        // Parse identifier
        const identifier = parseInt(req.body.member.memberId);
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const person = await Persons.findByPk(identifier)
        if (!person) throw createHttpError(404, 'Person not found')


        // Test params
        const birthDateFormat = new Date(req.body.member.birthDate)
        const contributionDateFormat = new Date(req.body.member.contributionDate)

        const validator = isValidMember(birthDateFormat, req.body.member.birthPlace, req.body.member.nationality, req.body.member.promotion, contributionDateFormat, req.body.member.department, req.body.member.membershipNumber)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const member = await Members.create({
            memberId: req.body.member.memberId,
            birthDate: req.body.member.birthDate,
            birthPlace: req.body.member.birthPlace,
            nationality: req.body.member.nationality,
            promotion: req.body.member.promotion,
            contributionDate: req.body.member.contributionDate,
            department: req.body.member.department,
            membershipNumber: req.body.member.membershipNumber,
            addressId: req.body.member.addressId,
            telegramId: req.body.member.telegramId,
            chatBotId: req.body.member.chatBotId,
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
        const identifier = parseInt(req.params.memberId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const member = await Members.findByPk(identifier)
        if (!member) throw createHttpError(404, 'Member not found')

        const birthDateFormat = new Date(req.body.member.birthDate)
        const contributionDateFormat = new Date(req.body.member.contributionDate)
        const validator = isValidMember(birthDateFormat, req.body.member.birthPlace, req.body.member.nationality, req.body.member.promotion, contributionDateFormat, req.body.member.department, req.body.member.membershipNumber)

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
