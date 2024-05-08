import Projects from '../../src/models/project.model'
import { createClient } from './client.seeders'

export const createProject = async (acronym: string, username: string) => {
    const clientId = await createClient(username)

    const startDate = new Date().toISOString()
    const endDate = new Date().toISOString()

    const project = await Projects.create({
        acronym: acronym,
        clientId: clientId,
        startDate: startDate,
        endDate: endDate
    })

    return project.projectId
}
