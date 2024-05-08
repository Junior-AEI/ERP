import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import Projects from '../src/models/project.model'
import { initUser } from './seeders/general'
import { createProject } from './seeders/project.seeders'
import { createClient } from './seeders/client.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/project (Get all projects)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createProject('EMA', 'johnny.doe')
        await createProject('THALES', 'jane.doe')

        const res = await request(app).get('/api/project').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.projects.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.projects[i].projectId).toBeDefined()
            expect(res.body.data.projects[i].acronym).toBeDefined()
            expect(res.body.data.projects[i].clientId).toBeDefined()
            expect(res.body.data.projects[i].startDate).toBeDefined()
            expect(res.body.data.projects[i].endDate).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/project/:projectId (Get a specific project)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'wrongId']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app).get(`/api/project/${wrongFormatId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/project/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        await createProject('Ens', 'johnny.doe')
        await createProject('Mat', 'jane.doe')

        const token = await initUser('john.doe')

        const project = await Projects.findOne({
            where: {
                acronym: 'Ens'
            }
        })

        const res = await request(app).get(`/api/project/${project?.projectId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.project).toBeDefined()
        expect(res.body.data.project.projectId).toEqual(project?.projectId)
        expect(res.body.data.project.acronym).toEqual(project?.acronym)
        expect(res.body.data.project.clientId).toEqual(project?.clientId)
    })
})

// ! DONE
describe('ROUTE (POST): /api/project (Create new project)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        acronym: 'Matmeca',
        startDate: new Date(),
        endDate: new Date()
    }

    it('Wrong format clientId', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/project')
                .send({
                    project: {
                        clientId: wrongFormatId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong clientId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/project')
            .send({
                project: {
                    clientId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong acronym', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const wrongAcronymList = ['', null, undefined, 'AcronymToooooLong']

        for (const wrongAcronym of wrongAcronymList) {
            const res = await request(app)
                .post('/api/project')
                .send({
                    project: {
                        clientId: clientId,
                        ...goodParams,
                        acronym: wrongAcronym
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong start date', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const wrongStartDateList = ['', 'Wrong Date', null, undefined]

        for (const wrongStartDate of wrongStartDateList) {
            const res = await request(app)
                .post('/api/project')
                .send({
                    project: {
                        clientId: clientId,
                        ...goodParams,
                        startDate: wrongStartDate
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong end date', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const wrongDateList = ['', 'Wrong Date', null, undefined]

        for (const wrongDate of wrongDateList) {
            const res = await request(app)
                .post('/api/project')
                .send({
                    project: {
                        clientId: clientId,
                        ...goodParams,
                        endDate: wrongDate
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('johnny.doe')

        const res = await request(app)
            .post('/api/project')
            .send({
                project: {
                    clientId: clientId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.projectId).toBeDefined()

        const project = await Projects.findOne({
            where: {
                projectId: res.body.data.projectId
            }
        })

        expect(project?.projectId).toEqual(res.body.data.projectId)
        expect(project?.acronym).toEqual(goodParams.acronym)
        expect(project?.startDate).toEqual(goodParams.startDate)
        expect(project?.endDate).toEqual(goodParams.endDate)
        expect(project?.clientId).toEqual(clientId)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/project/:id (Update project)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        acronym: 'Matmeca',
        startDate: new Date(),
        endDate: new Date()
    }

    it('Wrong format projectId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/project/${wrongParam}`)
                .send({
                    project: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/project/${-10}`)
            .send({
                company: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format clientId', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('Ens', 'johnny.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/project/${projectId}}`)
                .send({
                    project: {
                        ...goodParams,
                        clientId: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong clientId', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('AAA', 'johnny.doe')

        const res = await request(app)
            .put(`/api/project/${projectId}}`)
            .send({
                project: {
                    ...goodParams,
                    clientId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong acronym', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('Ens', 'johnny.doe')

        const wrongAcronymList = ['', null, undefined, 'AcronymToooooLong', 19]

        for (const wrongAcronym of wrongAcronymList) {
            const res = await request(app)
                .put(`/api/project/${projectId}`)
                .send({
                    project: {
                        ...goodParams,
                        acronym: wrongAcronym
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong start date', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('Ens', 'johnny.doe')

        const wrongDateList = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongDateList) {
            const res = await request(app)
                .put(`/api/project/${projectId}`)
                .send({
                    project: {
                        ...goodParams,
                        startDate: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong end date', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('Ens', 'johnny.doe')

        const wrongDateList = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongDateList) {
            const res = await request(app)
                .put(`/api/project/${projectId}`)
                .send({
                    project: {
                        ...goodParams,
                        endDate: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const clientId = await createClient('jane.doe')
        const projectId = await createProject('Ens', 'johnny.doe')

        const project = await Projects.findOne({
            where: {
                projectId: projectId
            }
        })

        expect(project?.projectId).toEqual(projectId)
        expect(project?.acronym).toEqual('Ens')

        const res = await request(app)
            .put(`/api/project/${projectId}`)
            .send({
                project: {
                    ...goodParams,
                    clientId: clientId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedProject = await Projects.findOne({
            where: {
                projectId: projectId
            }
        })

        expect(updatedProject?.projectId).toEqual(projectId)
        expect(updatedProject?.acronym).toEqual(goodParams.acronym)
        expect(updatedProject?.startDate).toEqual(goodParams.startDate)
        expect(updatedProject?.endDate).toEqual(goodParams.endDate)
        expect(updatedProject?.clientId).toEqual(clientId)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/project/:id (Delete project)', () => {
    afterEach(clearDatabase)

    it('Wrong format projectId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/project/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong projectId (project not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/project/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const projectId = await createProject('ENS', 'johnny.doe')

        const project = await Projects.findOne({
            where: {
                projectId: projectId
            }
        })

        expect(project).toBeTruthy()

        const res = await request(app).delete(`/api/project/${projectId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedProject = await Projects.findOne({
            where: {
                projectId: projectId
            }
        })

        expect(deletedProject).not.toBeTruthy()
    })
})
