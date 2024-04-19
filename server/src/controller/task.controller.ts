import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Tasks from '../models/task.model'
import { HttpError } from 'http-errors'
import { isValidTask } from '../validator/task.validator'
import { controllerErrorHandler, isNumber } from './utils.controller'

/**
 * Get all users
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const tasks = await Tasks.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                tasks: tasks
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
        if (req.params.taskId && !isNumber(req.params.taskId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.taskId)

        const task = await Tasks.findByPk(identifier, {})
        if (!task) throw createHttpError(404, 'Task not found')

        return res.status(200).json({
            status: 'success',
            data: {
                task: task
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
        if (req.params.taskId && !isNumber(req.params.taskId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.taskId)

        // Test params
        const validator = isValidTask(req.body.task.dueDate, req.body.task.description, req.body.task.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const task = await Tasks.create({
            taskId: identifier,
            dueDate: req.body.task.dueDate,
            description: req.body.task.description,
            state: req.body.task.state
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                taskId: task.taskId
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
        if (req.params.taskId && !isNumber(req.params.taskId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.taskId)

        const task = await Tasks.findByPk(identifier, {})
        if (!task) throw createHttpError(404, 'Task not found')

        // Test params
        const validator = isValidTask(req.body.task.dueDate, req.body.task.description, req.body.task.state)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        await Tasks.update(req.body, {
            where: { taskId: identifier }
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
        if (req.params.taskId && !isNumber(req.params.taskId)) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.taskId)

        const task = await Tasks.findByPk(identifier, {})
        if (!task) throw createHttpError(404, 'Task not found')

        await Tasks.destroy({
            where: {
                taskId: identifier
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const taskController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default taskController
