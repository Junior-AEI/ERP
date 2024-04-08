import { Request, Response } from 'express'
import Members from '../models/member.model'
import { isNumber, controllerErrorHandler } from './utils.controller'
import { HttpError } from 'http-errors'
import createHttpError from 'http-errors'
import { isValidMember } from '../validator/member.validator'

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
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')

        const identifier = parseInt(req.params.id)

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
    // TODO : Ask for the user creator routine
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
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const member = await Members.findByPk(identifier)
        if (!member) throw createHttpError(404, 'User not found')

        const validator = isValidMember(
            req.body.group.birthDate,
            req.body.group.birthPlace,
            req.body.group.nationality,
            req.body.group.promotion,
            req.body.group.contributionDate,
            req.body.group.department
        )

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
        if (req.params.id && !isNumber(req.params.id))
            throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.id)

        const member = await Members.findByPk(identifier)
        if (!member) throw createHttpError(404, 'Group not found')

        await Members.destroy({
            where: {
                userId: req.body.user.userId
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
