import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import Notifications from '../models/notification.model'
import { HttpError } from 'http-errors'
import { isValidNotification } from '../validator/notification.validator'
import { controllerErrorHandler } from './utils.controller'
import Users from '../models/user.model'

/**
 * Get all notifications
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const notifications = await Notifications.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                notifications: notifications
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Select a specific notification
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        const identifier = parseInt(req.params.notificationId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const notification = await Notifications.findByPk(identifier)
        if (!notification) throw createHttpError(404, 'Notification not found')

        return res.status(200).json({
            status: 'success',
            data: {
                notification: notification
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a notification
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // parse user identifier
        const idUser = parseInt(req.body.notification.userId)
        if (isNaN(idUser)) throw createHttpError(400, 'Please provide a valid user identifier')

        const user = await Users.findByPk(idUser)
        if (!user) throw createHttpError(404, 'Link user not found')

        // Test params
        const validator = isValidNotification(req.body.notification.title, req.body.notification.description, req.body.notification.pathConcerned)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        // Insert data
        const notification = await Notifications.create({
            userId: idUser,
            title: req.body.notification.title,
            description: req.body.notification.description,
            pathConcerned: req.body.notification.pathConcerned
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                notificationId: notification.notificationId
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
        // parse identifier
        const identifier = parseInt(req.params.notificationId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const notification = await Notifications.findByPk(identifier)
        if (!notification) throw createHttpError(404, 'Notification not found')

        // parse user identifier
        const idUser = parseInt(req.body.notification.userId)
        if (isNaN(idUser)) throw createHttpError(400, 'Please provide a valid user identifier')

        const user = await Users.findByPk(idUser)
        if (!user) throw createHttpError(404, 'Link user not found')

        // Test params
        const validator = isValidNotification(req.body.notification.title, req.body.notification.description, req.body.notification.pathConcerned)
        if (!validator.valid) throw createHttpError(400, validator.message as string)

        await Notifications.update(req.body.notification, {
            where: { notificationId: identifier }
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
        // parse identifier
        const identifier = parseInt(req.params.notificationId)
        if (isNaN(identifier)) throw createHttpError(400, 'Please provide a valid identifier')

        const notification = await Notifications.findByPk(identifier)
        if (!notification) throw createHttpError(404, 'Notification not found')

        await Notifications.destroy({
            where: {
                notificationId: identifier
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

const notificationController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default notificationController
