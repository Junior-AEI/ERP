import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase } from './utils'
import { initUser } from './seeders/general'
import { createNotification } from './seeders/notification.seeders'
import Notifications from '../src/models/notification.model'
import { notifications } from './seeders/data/notification.data'
import { createUser } from './seeders/user.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/notification (Get all notifications)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe')

        await createNotification(1)
        await createNotification(2)

        const res = await request(app).get('/api/notification').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.notifications.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.notifications[i].notificationId).toBeDefined()
            expect(res.body.data.notifications[i].userId).toBeDefined()
            expect(res.body.data.notifications[i].title).toBeDefined()
            expect(res.body.data.notifications[i].description).toBeDefined()
            expect(res.body.data.notifications[i].pathConcerned).toBeDefined()
        }
    })
})

// ! DONE
describe('ROUTE (GET): /api/notification/:notificationId (Get a specific notification)', () => {
    afterEach(clearDatabase)

    it('Wrong format id', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'wrongId']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app).get(`/api/notification/${wrongFormatId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong notificationId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/notification/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        const notificationId = await createNotification(1)

        const token = await initUser('john.doe')

        const notification = await Notifications.findOne({
            where: {
                notificationId: notificationId
            }
        })

        const res = await request(app).get(`/api/notification/${notification?.notificationId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.notification).toBeDefined()
        expect(res.body.data.notification.notificationId).toEqual(notification?.notificationId)
        expect(res.body.data.notification.userId).toEqual(notification?.userId)
        expect(res.body.data.notification.title).toEqual(notification?.title)
        expect(res.body.data.notification.description).toEqual(notification?.description)
        expect(res.body.data.notification.pathConcerned).toEqual(notification?.pathConcerned)
    })
})

// ! DONE
describe('ROUTE (POST): /api/notification (Create new notification)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        title: 'Demande de relecture',
        description: 'Il me faut une relecture de CE',
        pathConcerned: 'Etudes'
    }

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const wrongFormatIdList = [null, undefined, 'Id']

        for (const wrongFormatId of wrongFormatIdList) {
            const res = await request(app)
                .post('/api/notification')
                .send({
                    notification: {
                        userId: wrongFormatId,
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
            .post('/api/notification')
            .send({
                notification: {
                    userId: -10,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong title', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongTitleList = ['', null, undefined, 'UserToooo' + 'o'.repeat(50) + 'oLong']

        for (const wrongTitle of wrongTitleList) {
            const res = await request(app)
                .post('/api/notification')
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        title: wrongTitle
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongTitleList = ['', null, undefined, 'UserToooo' + 'o'.repeat(1000) + 'oLong']

        for (const wrongTitle of wrongTitleList) {
            const res = await request(app)
                .post('/api/notification')
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        description: wrongTitle
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong pathConcerned', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const wrongPathConcernedList = ['sh', null, undefined, 'AdvancementToooo' + 'o'.repeat(10) + 'oLong', 'not in list']

        for (const wrongPathConcerned of wrongPathConcernedList) {
            const res = await request(app)
                .post('/api/notification')
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        pathConcerned: wrongPathConcerned
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const userId = await createUser('jane.doe')

        const res = await request(app)
            .post('/api/notification')
            .send({
                notification: {
                    userId: userId,
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.notificationId).toBeDefined()

        const notification = await Notifications.findOne({
            where: {
                notificationId: res.body.data.notificationId
            }
        })

        expect(notification?.notificationId).toEqual(res.body.data.notificationId)
        expect(notification?.userId).toEqual(userId)
        expect(notification?.title).toEqual(goodParams.title)
        expect(notification?.description).toEqual(goodParams.description)
        expect(notification?.pathConcerned).toEqual(goodParams.pathConcerned)
    })
})

// ! DONE
describe('ROUTE (PUT): /api/notification/:id (Update notification)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        title: 'Demande de relecture',
        description: 'Il me faut une relecture de CE',
        pathConcerned: 'Etudes'
    }

    it('Wrong format notificationId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/notification/${wrongParam}`)
                .send({
                    projectNote: {
                        ...goodParams
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong notificationId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/notification/${-10}`)
            .send({
                notification: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong format userId', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .put(`/api/notification/${notifId}}`)
                .send({
                    notification: {
                        ...goodParams,
                        userId: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong userId', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)

        const res = await request(app)
            .put(`/api/notification/${notifId}}`)
            .send({
                notification: {
                    ...goodParams,
                    userId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong title', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)
        const userId = await createUser('jane.doe')

        const wrongTitleList = ['', null, undefined, 'TitleToooo' + 'o'.repeat(50) + 'oLong']

        for (const wrongTitle of wrongTitleList) {
            const res = await request(app)
                .put(`/api/notification/${notifId}`)
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        title: wrongTitle
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)
        const userId = await createUser('jane.doe')

        const wrongDescriptionList = ['', null, undefined, 'TitleToooo' + 'o'.repeat(1000) + 'oLong']

        for (const wrongDescription of wrongDescriptionList) {
            const res = await request(app)
                .put(`/api/notification/${notifId}`)
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        description: wrongDescription
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong path concerned', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)
        const userId = await createUser('jane.doe')

        const wrongPathConcernedList = ['sh', null, undefined, 'AdvancementToooo' + 'o'.repeat(10) + 'oLong', 'not in list']

        for (const wrongPathConcerned of wrongPathConcernedList) {
            const res = await request(app)
                .put(`/api/notification/${notifId}`)
                .send({
                    notification: {
                        userId: userId,
                        ...goodParams,
                        pathConcerned: wrongPathConcerned
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)
        const userId = await createUser('jane.doe')

        const notification = await Notifications.findOne({
            where: {
                notificationId: notifId
            }
        })

        expect(notification?.notificationId).toEqual(notifId)
        expect(notification?.title).toEqual(notifications['notif1'].title)
        expect(notification?.description).toEqual(notifications['notif1'].description)
        expect(notification?.pathConcerned).toEqual(notifications['notif1'].pathConcerned)

        const res = await request(app)
            .put(`/api/notification/${notifId}`)
            .send({
                notification: {
                    ...goodParams,
                    userId: userId
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedNotification = await Notifications.findOne({
            where: {
                notificationId: notifId
            }
        })

        expect(updatedNotification?.notificationId).toEqual(notifId)
        expect(updatedNotification?.title).toEqual(goodParams.title)
        expect(updatedNotification?.description).toEqual(goodParams.description)
        expect(updatedNotification?.pathConcerned).toEqual(goodParams.pathConcerned)
        expect(updatedNotification?.userId).toEqual(userId)
    })
})

// ! DONE
describe('ROUTE (DELETE): /api/notification/:id (Delete notification)', () => {
    afterEach(clearDatabase)

    it('Wrong format notificationId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/notification/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong notifId (notif not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/notification/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const notifId = await createNotification(1)

        const notification = await Notifications.findOne({
            where: {
                notificationId: notifId
            }
        })

        expect(notification).toBeTruthy()

        const res = await request(app).delete(`/api/notification/${notifId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedNotif = await Notifications.findOne({
            where: {
                notificationId: notifId
            }
        })

        expect(deletedNotif).not.toBeTruthy()
    })
})
