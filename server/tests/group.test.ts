import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { createUser } from './seeders/user.seeders'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { createGroup } from './seeders/groups.seeders'
import Groups from '../src/models/group.model'
import { groups } from './seeders/data/groups.data'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/group (Get all groups)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {

        await createGroup("group_1")
        await createGroup("group_2")
        await createGroup("group_3")

        await createUser('john.doe')

        const token = await createToken('john.doe')

        const res = await request(app)
            .get('/api/group').
            set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.groups.length).toEqual(3)

        for (let i = 0; i < 3; i++) {
            expect(res.body.data.groups[i].groupId).toBeDefined()
            expect(res.body.data.groups[i].groupName).toBeDefined()
            expect(res.body.data.groups[i].createdAt).toBeDefined()
            expect(res.body.data.groups[i].updatedAt).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/group/:groupId (Get a specific group)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongUserId']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).get(`/api/group/${wrongParam}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/group/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {

        const groupId = await createGroup('group_1')

        const token = await initUser('john.doe')

        const group = await Groups.findOne({
            where: {
                groupId: groupId
            }
        })

        const res = await request(app).get(`/api/group/${group?.groupId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.group.groupName).toEqual(group?.groupName)
    })
})

// ! DONE
describe('ROUTE (POST): /api/group (Create new group)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        groupName: 'un pole quelconque',
    }

    it('Wrong groupName', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [
            '',
            null,
            undefined,
            'NameToooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong'
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/group')
                .send({
                    group: {
                        ...goodParams,
                        groupName: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/group')
            .send({
                group: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.groupId).toBeDefined()

        const group = await Groups.findOne({
            where: {
                groupId: res.body.data.groupId
            }
        })

        expect(group?.groupId).toEqual(res.body.data.groupId)
        expect(group?.groupName).toEqual(goodParams.groupName)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/group/:id (Update group)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        groupName: 'nouveau nom de pole',
    }

    it('Wrong format groupId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/group/${wrongParam}`)
                .send({
                    group: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong groupId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/group/${-10}`)
            .send({
                group: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong groupName', async () => {

        const groupId = await createGroup('group_1')

        const token = await initUser('john.doe')

        const wrongParamList = [
            '',
            null,
            undefined,
            'NameToooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooLong'
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/group/${groupId}`)
                .send({
                    group: {
                        ...goodParams,
                        groupName: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {

        const groupId = await createGroup('group_1')

        const token = await initUser('john.doe')

        const group = await Groups.findOne({
            where: {
                groupId: groupId
            }
        })

        expect(group?.groupId).toEqual(groupId)
        expect(group?.groupName).toEqual(groups['group_1'].groupName)

        const res = await request(app)
            .put(`/api/group/${groupId}`)
            .send({
                group: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedGroup = await Groups.findOne({
            where: {
                groupId: groupId
            }
        })

        expect(updatedGroup?.groupId).toEqual(groupId)
        expect(updatedGroup?.groupName).toEqual(goodParams.groupName)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/group/:id (Delete group)', () => {
    afterEach(clearDatabase)

    it('Wrong format groupId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongUserIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/group/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong groupId (group not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/group/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {

        const groupId = await createGroup('group_1')

        const token = await initUser('john.doe')

        const group = await Groups.findOne({
            where: {
                groupId: groupId
            }
        })

        expect(group).toBeTruthy()

        const res = await request(app).delete(`/api/group/${groupId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedGroup = await Groups.findOne({
            where: {
                groupId: groupId
            }
        })

        expect(deletedGroup).not.toBeTruthy()
    })
})
