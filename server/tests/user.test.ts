import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { createUser } from './seeders/user.seeders'
import { createToken } from './seeders/token.seeders'
import bcrypt from 'bcrypt'
import { initUser } from './seeders/general'
import Users from '../src/models/user.model'
import { createMember } from './seeders/member.seeders'
import { characters } from './seeders/data/characters.data'
import { promisify } from 'util'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/user (Get all users)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        await createUser('john.doe')
        await createUser('jane.doe')

        const token = await createToken('john.doe')

        const res = await request(app).get('/api/user').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.users.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.users[i].userId).toBeDefined()
            expect(res.body.data.users[i].username).toBeDefined()
            expect(res.body.data.users[i].lastLogin).toBeDefined()
            expect(res.body.data.users[i].mandateStart).toBeDefined()
            expect(res.body.data.users[i].mandateEnd).toBeDefined()
            expect(res.body.data.users[i].emailJE).toBeDefined()
            expect(res.body.data.users[i].createdAt).toBeDefined()
            expect(res.body.data.users[i].updatedAt).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/user/:userId (Get a specific user)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongFormatUserIdList = [null, undefined, 'wrongUserId']

        for (const wrongFormatUserId of wrongFormatUserIdList) {
            const res = await request(app).get(`/api/user/${wrongFormatUserId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/user/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        const token = await initUser('john.doe')

        const user = await Users.findOne({
            where: {
                username: 'john.doe'
            }
        })

        const res = await request(app).get(`/api/user/${user?.userId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.user).toBeDefined()
        expect(res.body.data.user.userId).toEqual(user?.userId)
        expect(res.body.data.user.username).toEqual(user?.username)
        expect(res.body.data.user.emailJE).toEqual(user?.emailJE)
    })
})

// ! DONE
describe('ROUTE (POST): /api/user (Create new user)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        username: 'jane.doe',
        password: 'correctPassword',
        mandateStart: new Date(),
        mandateEnd: new Date(),
        emailJE: 'jane@doe.com'
    }

    it('Wrong format memberId', async () => {
        const token = await initUser('john.doe')

        const wrongFormatMemberIdList = [null, undefined, 'memberId']

        for (const wrongFormatMemberId of wrongFormatMemberIdList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: wrongFormatMemberId,
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong memberId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/user')
            .send({
                user: {
                    userId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong username', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const wrongUsernameList = ['', null, undefined, 'NameToooooooooooooooooooooooooooooooooLong']

        for (const wrongUsername of wrongUsernameList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: memberId,
                        ...goodParams,
                        username: wrongUsername
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong password', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const wrongPasswordList = ['short', null, undefined, 'passwordToooooooooooooooooooooooooooooooooLong']

        for (const wrongPassword of wrongPasswordList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: memberId,
                        ...goodParams,
                        password: wrongPassword
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong mandateStart', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const wrongMandateStartList = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongMandateStartList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: memberId,
                        ...goodParams,
                        mandateStart: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong mandateEnd', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const wrongParamList = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: memberId,
                        ...goodParams,
                        mandateEnd: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong email', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const wrongParamList = ['', 100, null, undefined, 'email', 'jane@doe', 'jane.com']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/user')
                .send({
                    user: {
                        memberId: memberId,
                        ...goodParams,
                        emailJE: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const memberId = await createMember('jane.doe')

        const res = await request(app)
            .post('/api/user')
            .send({
                user: {
                    userId: memberId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.userId).toBeDefined()

        const user = await Users.findOne({
            where: {
                userId: res.body.data.userId
            }
        })

        expect(user?.userId).toEqual(res.body.data.userId)
        expect(user?.username).toEqual(goodParams.username)
        expect(user?.password).toEqual(goodParams.password)
        expect(user?.mandateStart).toEqual(goodParams.mandateStart)
        expect(user?.mandateEnd).toEqual(goodParams.mandateEnd)
        expect(user?.emailJE).toEqual(goodParams.emailJE)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/user/:id (Update user)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        username: 'jane.doee',
        password: 'correctPasswordd',
        mandateStart: new Date(),
        mandateEnd: new Date(),
        emailJE: 'jane@doe.comm'
    }

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongUserIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/user/${wrongParam}`)
                .send({
                    user: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/user/${-10}`)
            .send({
                user: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong username', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongUsernameList = ['', null, undefined, 'NameToooooooooooooooooooooooooooooooooLong', 19]

        for (const wrongUsername of wrongUsernameList) {
            const res = await request(app)
                .put(`/api/user/${userId}`)
                .send({
                    user: {
                        ...goodParams,
                        username: wrongUsername
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong password', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongPasswordList = ['short', null, undefined, 'passwordToooooooooooooooooooooooooooooooooLong']

        for (const wrongParam of wrongPasswordList) {
            const res = await request(app)
                .put(`/api/user/${userId}`)
                .send({
                    user: {
                        ...goodParams,
                        password: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong mandateStart', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongParams = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/user/${userId}`)
                .send({
                    user: {
                        ...goodParams,
                        mandateStart: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong mandateEnd', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongParams = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/user/${userId}`)
                .send({
                    user: {
                        ...goodParams,
                        mandateEnd: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong email', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongParams = ['', 100, null, undefined, 'email', 'jane@doe', 'jane.com']

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/user/${userId}`)
                .send({
                    user: {
                        ...goodParams,
                        emailJE: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const user = await Users.findOne({
            where: {
                userId: userId
            }
        })

        expect(user?.userId).toEqual(userId)
        expect(user?.username).toEqual(characters['jane.doe'].person.firstname.toLocaleLowerCase() + '.' + characters['jane.doe'].person.lastname.toLocaleLowerCase())
        expect(user?.emailJE).toEqual(characters['jane.doe'].person.email)
        expect(await promisify(bcrypt.compare)(characters['jane.doe'].password, user?.password ? user?.password : '')).toBeTruthy()

        const res = await request(app)
            .put(`/api/user/${userId}`)
            .send({
                user: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedUser = await Users.findOne({
            where: {
                userId: userId
            }
        })

        expect(updatedUser?.userId).toEqual(userId)
        expect(updatedUser?.username).toEqual(goodParams.username)
        expect(updatedUser?.emailJE).toEqual(goodParams.emailJE)
        expect(updatedUser?.mandateStart).toEqual(goodParams.mandateStart)
        expect(updatedUser?.mandateEnd).toEqual(goodParams.mandateEnd)
        expect(await promisify(bcrypt.compare)(goodParams.password, updatedUser?.password ? updatedUser?.password : '')).toBeTruthy()
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/user/:id (Delete user)', () => {
    afterEach(clearDatabase)

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongUserIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/user/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId (user not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/user/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const user = await Users.findOne({
            where: {
                userId: userId
            }
        })

        expect(user).toBeTruthy()

        const res = await request(app).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedUser = await Users.findOne({
            where: {
                userId: userId
            }
        })

        expect(deletedUser).not.toBeTruthy()
    })
})
