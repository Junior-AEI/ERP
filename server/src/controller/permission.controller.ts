import { Request, Response } from 'express'
import Permissions from '../models/permission.model'
import { controllerErrorHandler } from './utils.controller'
import createHttpError from 'http-errors'
import { HttpError } from 'http-errors'
import { isValidPermission } from '../validator/permission.validator'

/**
 * Get all groups
 * @param req
 * @param res
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const permissions = await Permissions.findAll({})

        return res.status(200).json({
            status: 'success',
            data: {
                permissions: permissions
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Get a specific group
 * @param req
 * @param res
 */
const getByPk = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.permissionName) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.permissionName)
        
        // Find    
        const permission = await Permissions.findByPk(identifier)
        if (!permission) throw createHttpError(404, 'Permission not found')

        return res.status(200).json({
            status: 'success',
            data: {
                permission: permission
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Create a group
 * @param req
 * @param res
 */
async function create(req: Request, res: Response) {
    try {
        // Test params
        const validator = isValidPermission(req.body.permission.permissionName, req.body.permission.permissionType)
        if (!validator.valid) return createHttpError(400, validator.message as string)

        // Insert data
        const permission = await Permissions.create({
            groupName: req.body.group.groupName
        })

        // Return success
        return res.status(200).json({
            status: 'success',
            data: {
                permissionName: permission.permissionName
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Update a group
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.permissionName) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.permissionName)
        
        // Find    
        const permission = await Permissions.findByPk(identifier)
        if (!permission) throw createHttpError(404, 'Permission not found')


        // Test params
        const validator = isValidPermission(req.body.permission.permissionName, req.body.permission.permissionType)
        if (validator.valid == 0) throw createHttpError(400, validator.message as string)

        await Permissions.update(req.body, {
                where: { permissionName: identifier }
            }
        )

        // Return success
        return res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

/**
 * Delete a group
 * @param req
 * @param res
 */
const del = async (req: Request, res: Response) => {
    try {
        // Parse identifier
        if (req.params.permissionName) throw createHttpError(400, 'Please provide a valid identifier')
        const identifier = parseInt(req.params.permissionName)
        
        // Find    
        const permission = await Permissions.findByPk(identifier)
        if (!permission) throw createHttpError(404, 'Permission not found')

        // Destroy
        await Permissions.destroy({
            where: {
                permissionName: req.body.permission.permissionName
            }
        })
    } catch (err) {
        if (err instanceof HttpError) controllerErrorHandler(err, res)
        else throw err
    }
}

const permissionController = {
    getAll,
    getByPk,
    create,
    del,
    update
}

export default permissionController
