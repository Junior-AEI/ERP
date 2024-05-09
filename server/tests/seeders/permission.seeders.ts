import Persons from '../../src/models/person.model'
import Members from '../../src/models/member.model'
import Addresses from '../../src/models/address.model'
import Users from '../../src/models/user.model'
import bcrypt from 'bcrypt'
import { characters } from './data/characters.data'
import Permissions from '../../src/models/permission.model'
import { permissions } from './data/permissions.data'

export const createPermission = async (permissionName: string) => {
    const permission = await Permissions.create({
        permissionName: permissions[permissionName].permissionName,
        permissionType: permissions[permissionName].permissionType,
    })
    return permission.permissionId
}
