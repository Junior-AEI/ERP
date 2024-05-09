import Addresses from '../../src/models/address.model'
import Groups from '../../src/models/group.model'
import { characters } from './data/characters.data'
import { groups } from './data/groups.data'

export const createGroup = async (groupName: string) => {
    const group = await Groups.create({
        groupName: groups[groupName].groupName
    })
    return group.groupId
}
