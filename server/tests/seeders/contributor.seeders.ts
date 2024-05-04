import Contributors from "../../src/models/contributor.model";
import { createProject } from "./project.seeders";
import { createMember } from './member.seeders'

export const createContributor = async (acronym: string, clientUsername: string, memberUsername: string) => {
    const projectId = await createProject(acronym, clientUsername)
    const memberId = await createMember(memberUsername)
    
    const contributor = await Contributors.create({
        projectId: projectId,
        memberId: memberId,
    })

    return contributor.contributorId
}