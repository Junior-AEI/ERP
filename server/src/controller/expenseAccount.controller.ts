import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import AccountExpenses from '../models/expenseAccount.model'
import { HttpError } from 'http-errors'
import { isValidExpenseAccount } from '../validator/expenseAccount.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const accountExpenses = await AccountExpenses.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                accountExpenses: accountExpenses
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
        if (req.params.expenseId && !isNumber(req.params.expenseId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.expenseId)

        const accountExpense = await AccountExpenses.findByPk(identifier, {})
        if (!accountExpense) throw createHttpError(404, 'Expense not found')

        return res.status(200).json({
            status: 'success',
            data: {
                accountExpense: accountExpense
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
        console.log("TETETTTETTETTESSSTTSTS")
        var expenseDateFormat = new Date(req.body.expenseAccount.expenseDate);
        const validator = isValidExpenseAccount(req.body.expenseAccount.reason, expenseDateFormat, req.body.expenseAccount.description, 'A traiter')
        console.log(req.body.expenseAccount.expenseDate)

        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const accountExpense = await AccountExpenses.create({
            reason: req.body.expenseAccount.reason,
            expenseDate: req.body.expenseAccount.expenseDate,
            description: req.body.expenseAccount.description,
            userId: req.body.expenseAccount.userId,
            approbatorId : req.body.expenseAccount.approbatorId,
            state: 'A traiter'
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                expenseId: accountExpense.expenseId
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
        if (req.params.expenseId && !isNumber(req.params.expenseId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.expenseId)

        const accountExpense = await AccountExpenses.findByPk(identifier, {})
        if (!accountExpense) throw createHttpError(404, 'Expense not found')

        // Test params
        const validator = isValidExpenseAccount(req.body.expenseAccount.reason, req.body.expenseAccount.expenseDate, req.body.expenseAccount.description, req.body.expenseAccount.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        await AccountExpenses.update(req.body, {
            where: { expenseId: identifier }
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
        if (req.params.expenseId && !isNumber(req.params.expenseId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.expenseId)

        const accountExpense = await AccountExpenses.findByPk(identifier, {})
        if (!accountExpense) throw createHttpError(404, 'Expense not found')

        await AccountExpenses.destroy({
            where: {
                expenseId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const expenseAccountController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default expenseAccountController
