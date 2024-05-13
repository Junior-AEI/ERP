import Permissions from '../../src/models/permission.model'
import { permissions } from './data/permissions.data'

export const createPermission = async (permissionName: string) => {
    const permission = await Permissions.create({
        permissionName: permissions[permissionName].permissionName,
        permissionType: permissions[permissionName].permissionType,
    })
    return permission.permissionId
}
