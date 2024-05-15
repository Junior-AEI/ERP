import Groups from '../../src/models/group.model'
import { groups } from './data/groups.data'

export const createGroup = async (groupName: string) => {
    const group = await Groups.create({
        groupName: groups[groupName].groupName
    })
    return group.groupId
}
