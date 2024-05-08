import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createProjectManager } from './seeders/projectManager.seeders'
import ProjectManagers from '../src/models/projectManager.model'
import { createUser } from './seeders/user.seeders'
import { createProject } from './seeders/project.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/projectManager (Get all projectManagers)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createProjectManager('AAA', 'johnny.doe', 'jane.doe')
        await createProjectManager('BBB', 'jane.doe', 'john.doe')

        const res = await request(app).get('/api/projectManager').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.projectManagers.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.projectManagers[i].projectManagerId).toBeDefined()
            expect(res.body.data.projectManagers[i].projectId).toBeDefined()
            expect(res.body.data.projectManagers[i].userId).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/projectManager/:projectManagerId (Get a specific project manager)', () => {
    afterEach(clearDatabase)

    it('Wrong format id', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'wrongId']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app).get(`/api/projectManager/${wrongFormatId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong managerId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/projectManager/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')

        const token = await initUser('john.doe')

        const manager = await ProjectManagers.findOne({
            where: {
                projectManagerId: managerId
            }
        })

        const res = await request(app).get(`/api/projectManager/${manager?.projectManagerId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.projectManager).toBeDefined()
        expect(res.body.data.projectManager.projectManagerId).toEqual(manager?.projectManagerId)
        expect(res.body.data.projectManager.projectId).toEqual(manager?.projectId)
        expect(res.body.data.projectManager.userId).toEqual(manager?.userId)
    })
})

// ! DONE
describe('ROUTE (POST): /api/projectManager (Create new project manager)', () => {
    afterEach(clearDatabase)

    it('Wrong format projectId', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/projectManager')
                .send({
                    projectManager: {
                        projectId: wrongFormatId
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/projectManager')
            .send({
                projectManager: {
                    projectId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/projectManager')
                .send({
                    projectManager: {
                        projectId: projectId,
                        userId: wrongFormatId
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')

        const res = await request(app)
            .post('/api/projectManager')
            .send({
                projectManager: {
                    projectId: projectId,
                    userId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')
        const userId = await createUser('jane.doe')

        const res = await request(app)
            .post('/api/projectManager')
            .send({
                projectManager: {
                    projectId: projectId,
                    userId: userId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.projectManagerId).toBeDefined()

        const manager = await ProjectManagers.findOne({
            where: {
                projectManagerId: res.body.data.projectManagerId
            }
        })

        expect(manager?.projectManagerId).toEqual(res.body.data.projectManagerId)
        expect(manager?.projectId).toEqual(projectId)
        expect(manager?.userId).toEqual(userId)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/projectManager/:id (Update project manager)', () => {
    afterEach(clearDatabase)

    it('Wrong format managerId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectManager/${wrongParam}`)
                .send({
                    projectManager: {}
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong managerId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/projectManager/${-10}`)
            .send({
                projectManager: {}
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format projectId', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectManager/${managerId}}`)
                .send({
                    projectManager: {
                        projectId: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')

        const res = await request(app)
            .put(`/api/projectManager/${managerId}}`)
            .send({
                projectManager: {
                    projectId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/projectManager/${managerId}}`)
                .send({
                    projectManager: {
                        projectId: projectId,
                        writerId: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')

        const res = await request(app)
            .put(`/api/projectManager/${managerId}}`)
            .send({
                projectManager: {
                    projectId: projectId,
                    userId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')
        const projectId = await createProject('BBB', 'jane.doe')
        const userId = await createUser('john.doe')

        const manager = await ProjectManagers.findOne({
            where: {
                projectManagerId: managerId
            }
        })

        expect(manager?.projectManagerId).toEqual(managerId)

        const res = await request(app)
            .put(`/api/projectManager/${managerId}`)
            .send({
                projectManager: {
                    projectId: projectId,
                    userId: userId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedManager = await ProjectManagers.findOne({
            where: {
                projectManagerId: managerId
            }
        })

        expect(updatedManager?.projectManagerId).toEqual(managerId)
        expect(updatedManager?.userId).toEqual(userId)
        expect(updatedManager?.projectId).toEqual(projectId)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/projectManager/:id (Delete project manager)', () => {
    afterEach(clearDatabase)

    it('Wrong format managerId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/projectManager/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong managerId (manager not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/projectManager/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const managerId = await createProjectManager('AAA', 'johnny.doe', 'jane.doe')

        const manager = await ProjectManagers.findOne({
            where: {
                projectManagerId: managerId
            }
        })

        expect(manager).toBeTruthy()

        const res = await request(app).delete(`/api/projectManager/${managerId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedManager = await ProjectManagers.findOne({
            where: {
                projectManagerId: managerId
            }
        })

        expect(deletedManager).not.toBeTruthy()
    })
})
