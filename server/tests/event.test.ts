import request from 'supertest'
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { initUser } from './seeders/general'
import { createEvent } from './seeders/event.seeders'
import { events } from './seeders/data/events.data'
import { promisify } from 'util'
import Events from '../src/models/event.model'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/event (Get all events)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {
        // To have authorization
        const token = await initUser('john.doe') // TODO : Finish event tests

        await createEvent('Réunion au local AEI')
        await createEvent('Réunion mission client')

        const res = await request(app).get('/api/event').set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.events.length).toEqual(2)

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.events[i].eventId).toBeDefined()
            expect(res.body.data.events[i].name).toBeDefined()
            expect(res.body.data.events[i].startDate).toBeDefined()
            expect(res.body.data.events[i].endDate).toBeDefined()
            expect(res.body.data.events[i].location).toBeDefined()
            expect(res.body.data.events[i].description).toBeDefined()
            expect(res.body.data.events[i].eventTypeName).toBeDefined()
        }
    })
})

describe('ROUTE (GET): /api/event/:eventId (Get a specific event)', () => {
    afterEach(clearDatabase)

    it('Wrong format', async () => {
        const token = await initUser('john.doe')

        const wrongFormatEventIdList = [null, undefined, 'wrongEventId']

        for (const wrongFormatEventId of wrongFormatEventIdList) {
            const res = await request(app).get(`/api/event/${wrongFormatEventId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
        }
    })

    it('Wrong eventId with a good format', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).get(`/api/event/${-10}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {
        await createEvent('Réunion au local AEI')
        await createEvent('Réunion mission client')

        const token = await initUser('john.doe')

        const event = await Events.findOne({
            where: {
                name: 'Réunion au local AEI'
            }
        })

        const res = await request(app).get(`/api/event/${event?.eventId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')
        expect(res.body.data.event).toBeDefined()
        expect(res.body.data.event.eventId).toEqual(event?.eventId)
        expect(res.body.data.event.name).toEqual(event?.name)
        expect(res.body.data.event.startDate).toBe(event?.startDate.toISOString())
        expect(res.body.data.event.endDate).toBe(event?.endDate.toISOString())
        expect(res.body.data.event.location).toEqual(event?.location)
        expect(res.body.data.event.description).toEqual(event?.description)
        expect(res.body.data.event.eventTypeName).toEqual(event?.eventTypeName)
    })
})

/////////////////////////////////////////////////////////

describe('ROUTE (POST): /api/event (Create new event)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        name: 'Réunion au local AEI',
        startDate: new Date('2002-07-26T12:00:00').toISOString(),
        endDate: new Date('2002-07-26T12:00:00').toISOString(),
        location: 'Local AEI',
        description: 'Réunion au local AEI avec la team PFA',
        eventTypeName: 'Afterwork'
    }

    it('Wrong name', async () => {
        const token = await initUser('john.doe')

        const wrongNameList = ['', null, undefined, 'NameToooo' + 'o'.repeat(60) + 'ooooooooooooLong']

        for (const wrongName of wrongNameList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        name: wrongName
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong startDate', async () => {
        const token = await initUser('john.doe')

        const wrongStartDateList = ['', 'wrongDate', null, undefined]

        for (const wrongStartDate of wrongStartDateList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        startDate: wrongStartDate
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong endDate', async () => {
        const token = await initUser('john.doe')

        const wrongEndDateList = ['', 'wrongDate', null, undefined]

        for (const wrongEndDate of wrongEndDateList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        endDate: wrongEndDate
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong location', async () => {
        const token = await initUser('john.doe')

        const wrongLocationList = ['', 'to looooooooooooooooooooooooooooooooooooooooooooooooooong', null, undefined]

        for (const wrongLocation of wrongLocationList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        location: wrongLocation
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {
        const token = await initUser('john.doe')

        const wrongDescriptionList = ['', null, undefined]

        for (const wrongDescription of wrongDescriptionList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        description: wrongDescription
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong event type name', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = ['', 100, null, undefined, 'Réuuunion']

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .post('/api/event')
                .send({
                    event: {
                        ...goodParams,
                        eventTypeName: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .post('/api/event')
            .send({
                event: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.data.eventId).toBeDefined()

        const event = await Events.findOne({
            where: {
                eventId: res.body.data.eventId
            }
        })

        expect(event?.name).toEqual(goodParams.name)
        expect(event?.location).toEqual(goodParams.location)
        expect(event?.startDate.toISOString()).toEqual(goodParams.startDate)
        expect(event?.endDate.toISOString()).toEqual(goodParams.endDate)
        expect(event?.eventTypeName).toEqual(goodParams.eventTypeName)
        expect(event?.description).toEqual(goodParams.description)
    })
})

describe('ROUTE (PUT): /api/event/:id (Update event)', () => {
    afterEach(clearDatabase)

    const goodParams = {
        name: 'Réunion au local AEI',
        startDate: new Date('2002-07-26T12:00:00').toISOString(),
        endDate: new Date('2002-07-26T12:00:00').toISOString(),
        location: 'Local AEI',
        description: 'Réunion au local AEI avec la team PFA',
        eventTypeName: 'Afterwork'
    }

    it('Wrong format eventId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongEventIdFormat']

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

    it('Wrong eventId', async () => {
        const token = await initUser('john.doe')

        const res = await request(app)
            .put(`/api/event/${-10}`)
            .send({
                event: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Wrong name', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongNameList = ['', null, undefined, 'NameToooo' + 'o'.repeat(60) + 'ooooooooooooLong', 19]

        for (const wrongName of wrongNameList) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        name: wrongName
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong location', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongLocationList = [null, undefined, 'location tooooooooooooooooooooooooooooooooooo long']

        for (const wrongLocation of wrongLocationList) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        location: wrongLocation
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong startDate', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongParams = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        startDate: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong endDate', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongParams = ['', 'Wrong Date', null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        endDate: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong description', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongParams = ['', 100, null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        description: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong eventTypeName', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const wrongParams = ['Réuunion', 100, null, undefined]

        for (const wrongParam of wrongParams) {
            const res = await request(app)
                .put(`/api/event/${eventId}`)
                .send({
                    event: {
                        ...goodParams,
                        eventTypeName: wrongParam
                    }
                })
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const event = await Events.findOne({
            where: {
                eventId: eventId
            }
        })

        expect(event?.eventId).toEqual(eventId)
        expect(event?.name).toEqual(events['Réunion au local AEI'].name)
        expect(event?.location).toEqual(events['Réunion au local AEI'].location)
        expect(event?.description).toEqual(events['Réunion au local AEI'].description)
        expect(event?.eventTypeName).toEqual(events['Réunion au local AEI'].eventTypeName)
        expect(event?.startDate.toISOString()).toEqual(events['Réunion au local AEI'].startDate)
        expect(event?.endDate.toISOString()).toEqual(events['Réunion au local AEI'].endDate)

        const res = await request(app)
            .put(`/api/event/${eventId}`)
            .send({
                event: {
                    ...goodParams
                }
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const updatedEvent = await Events.findOne({
            where: {
                eventId: eventId
            }
        })

        expect(updatedEvent?.eventId).toEqual(eventId)
        expect(updatedEvent?.name).toEqual(goodParams.name)
        expect(updatedEvent?.location).toEqual(goodParams.location)
        expect(updatedEvent?.description).toEqual(goodParams.description)
        expect(updatedEvent?.eventTypeName).toEqual(goodParams.eventTypeName)
        expect(updatedEvent?.startDate.toISOString()).toEqual(goodParams.startDate)
        expect(updatedEvent?.endDate.toISOString()).toEqual(goodParams.endDate)
    })
})

describe('ROUTE (DELETE): /api/event/:id (Delete event)', () => {
    afterEach(clearDatabase)

    it('Wrong format eventId', async () => {
        const token = await initUser('john.doe')

        const wrongParamList = [null, undefined, 'wrongEventIdFormat']

        for (const wrongParam of wrongParamList) {
            const res = await request(app).delete(`/api/event/${wrongParam}`).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong eventId (event not found)', async () => {
        const token = await initUser('john.doe')

        const res = await request(app).delete(`/api/event/${-10}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toEqual(404)
    })

    it('Good usage', async () => {
        const token = await initUser('john.doe')

        const eventId = await createEvent('Réunion au local AEI')

        const event = await Events.findOne({
            where: {
                eventId: eventId
            }
        })

        expect(event).toBeTruthy()

        const res = await request(app).delete(`/api/event/${eventId}`).set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)

        const deletedEvent = await Events.findOne({
            where: {
                eventId: eventId
            }
        })

        expect(deletedEvent).not.toBeTruthy()
    })
})
