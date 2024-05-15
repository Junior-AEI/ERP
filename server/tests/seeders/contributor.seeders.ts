import Contributors from '../../src/models/contributor.model'
import { createProject } from './project.seeders'
import { createMember } from './member.seeders'

export const createContributor = async (name: string, acronym: string, clientUsername: string, memberUsername: string) => {
    const projectId = await createProject(name, acronym, clientUsername)
    const memberId = await createMember(memberUsername)

    const contributor = await Contributors.create({
        projectId: projectId,
        memberId: memberId
    })

    return contributor.contributorId
}
