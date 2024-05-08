import ProjectManagers from '../../src/models/projectManager.model'
import { createProject } from './project.seeders'
import { createUser } from './user.seeders'

export const createProjectManager = async (acronym: string, projectUsername: string, userName: string) => {
    const projectId = await createProject(acronym, projectUsername)
    const userId = await createUser(userName)

    const projectManager = await ProjectManagers.create({
        projectId: projectId,
        userId: userId
    })

    return projectManager.projectManagerId
}
