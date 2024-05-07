const request = require('supertest')
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { characters } from "./seeders/data/characters.data"
import { createPerson } from "./seeders/person.seeders "
import Persons from "../src/models/person.model"
import { createTask } from "./seeders/tasks.seeders"
import { createUser } from "./seeders/user.seeders"

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
// describe('ROUTE (GET): /api/task (Get all tasks)', () => {

//     afterEach(clearDatabase);

//     it('Normal usage', async () => {

//         const johnId = await createUser('john.doe')
//         const janeId = await createUser('jane.doe')

//         await createTask('task_1', johnId, janeId)
//         await createTask('task_2', johnId, janeId)
//         await createTask('task_3', johnId, janeId)
//         await createTask('task_4', johnId, janeId)
//         await createTask('task_5', johnId, janeId)

//         const token = await createToken("john.doe");

//         const res = await request(app)
//             .get('/api/task')
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)
//         expect(res.body.status).toEqual("success")
//         expect(res.body.data.tasks.length).toEqual(5);

//         for (let i = 0; i < 5; i++) {
//             expect(res.body.data.tasks[i].taskId).toBeDefined();
//             expect(res.body.data.tasks[i].userId).toBeDefined();
//             expect(res.body.data.tasks[i].dueDate).toBeDefined();
//             expect(res.body.data.tasks[i].description).toBeDefined();
//             expect(res.body.data.tasks[i].state).toBeDefined();
//             expect(res.body.data.tasks[i].issuerId).toBeDefined();
//         }

//     })

// })

describe('ROUTE (GET): /api/task/:task (Get a specific task)', () => {

    afterEach(clearDatabase);

    it('Wrong format', async () => {

        const token = await initUser('john.doe')

        const wrongParamList = [
            null,
            undefined,
            "wrongParamId"
        ]

        for (const wrongParam of wrongParamList) {
            const res = await request(app)
                .get(`/api/task/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong personId with a good format', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .get(`/api/person/${-10}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(404)
    })

    it('Normal usage', async () => {

        const token = await initUser('john.doe')

        await createPerson("jane.doe")

        const person = await Persons.findOne({
            where: {
                firstname: "Jane",
                lastname: "Doe",
            }
        })

        const res = await request(app)
            .get(`/api/person/${person?.personId}`)
            .set('Authorization', `Bearer ${token}`);


        expect(res.status).toEqual(200)
        expect(res.body.data.person).toBeDefined();
        expect(res.body.data.person.personId).toEqual(person?.personId);
        expect(res.body.data.person.firstname).toEqual(characters["jane.doe"].person["firstname"])
        expect(res.body.data.person.lastname).toEqual(characters["jane.doe"].person["lastname"])
        expect(res.body.data.person.gender).toEqual(characters["jane.doe"].person["gender"])
        expect(res.body.data.person.mobilePhone).toEqual(characters["jane.doe"].person["mobilePhone"])
        expect(res.body.data.person.email).toEqual(characters["jane.doe"].person["email"])
        expect(res.body.data.person.landlinePhone).toEqual(characters["jane.doe"].person["landlinePhone"])

    })

})

// // ! DONE
// describe('ROUTE (POST): /api/person (Create new person)', () => {

//     afterEach(clearDatabase);

//     const goodParams = {
//         firstname: 'Jane',
//         lastname: 'Doe',
//         gender: 'F',
//         mobilePhone: '+33646386357',
//         email: 'jane@doe.fr',
//         landlinePhone: '+33674589563'
//     }

//     it('Wrong firstname', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "firstnameToooooooooooooooooooooooooooooooooLong"
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .post("/api/person")
//                 .send({
//                     person: {
//                         ...goodParams,
//                         firstname: wrongParam,
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong lastname', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "lastnameToooooooooooooooooooooooooooooooooLong"
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .post("/api/person")
//                 .send({
//                     person: {
//                         ...goodParams,
//                         lastname: wrongParam,
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

// // ! Gender not tested in person.validator.ts
// // ! landlinePhone not tested in person.validator.ts

//     it('Wrong mobilePhone', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "numero",
//             10000,
//             1234567890123456
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .post("/api/person")
//                 .send({
//                     person: {
//                         ...goodParams,
//                         mobilePhone: wrongParam,
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong email', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             "",
//             100,
//             null,
//             undefined,
//             "email",
//             "jane@doe",
//             "jane.com",
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .post("/api/user")
//                 .send({
//                     user: {
//                         ...goodParams,
//                         email: wrongParam,
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Good usage', async () => {

//         const token = await initUser('john.doe')

//         const res = await request(app)
//         .post("/api/person")
//         .send({
//             person: {
//                 ...goodParams,
//             }
//         })
//         .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)
//         expect(res.body.data.personId).toBeDefined()

//         const person = await Persons.findOne({
//             where: {
//                 personId: res.body.data.personId
//             }
//         })

//         expect(person?.personId).toEqual(res.body.data.personId)
//         expect(person?.firstname).toEqual(goodParams.firstname)
//         expect(person?.lastname).toEqual(goodParams.lastname)
//         expect(person?.gender).toEqual(goodParams.gender)
//         expect(person?.mobilePhone).toEqual(goodParams.mobilePhone)
//         expect(person?.email).toEqual(goodParams.email)
//         expect(person?.landlinePhone).toEqual(goodParams.landlinePhone)
//     })

// })

// // ! DONE
// describe('ROUTE (PUT): /api/person/:id (Update person)', () => {

//     afterEach(clearDatabase);

//     const goodParams = {
//         firstname: 'Janee',
//         lastname: 'Doee',
//         gender: 'M',
//         mobilePhone: '+33646386358',
//         email: 'jane@doee.fr',
//         landlinePhone: '+33674589564'
//     }

//     it('Wrong format personId', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             null,
//             undefined,
//             "wrongUserIdFormat",
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/user/${wrongParam}`)
//                 .send({
//                     user: {
//                         ...goodParams
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong personId', async () => {

//         const token = await initUser('john.doe')

//         const res = await request(app)
//             .put(`/api/person/${-10}`)
//             .send({
//                 user: {
//                     ...goodParams
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`);
//         expect(res.status).toEqual(404)
//     })

//     it('Wrong firstname', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "firstnameToooooooooooooooooooooooooooooooooLong",
//             19
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/person/${personId}`)
//                 .send({
//                     person: {
//                         ...goodParams,
//                         firstname: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong lastname', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "lastnameToooooooooooooooooooooooooooooooooLong",
//             19
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/person/${personId}`)
//                 .send({
//                     person: {
//                         ...goodParams,
//                         lastname: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong mobilePhone', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "numero",
//             10000,
//             1234567890123456
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/person/${personId}`)
//                 .send({
//                     person: {
//                         ...goodParams,
//                         mobilePhone: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong email', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const wrongParamList = [
//             "",
//             100,
//             null,
//             undefined,
//             "email",
//             "jane@doe",
//             "jane.com",
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .put(`/api/person/${personId}`)
//                 .send({
//                     person: {
//                         ...goodParams,
//                         email: wrongParam
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     // ! Gender not tested in person.validator.ts
//     // ! landlinePhone not tested in person.validator.ts

//     it('Good usage', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const person = await Persons.findOne({
//             where: {
//                 personId: personId
//             }
//         })

//         expect(person?.personId).toEqual(personId)
//         expect(person?.firstname).toEqual(characters['jane.doe'].person.firstname)
//         expect(person?.lastname).toEqual(characters['jane.doe'].person.lastname)
//         expect(person?.gender).toEqual(characters['jane.doe'].person.gender)
//         expect(person?.mobilePhone).toEqual(characters['jane.doe'].person.mobilePhone)
//         expect(person?.email).toEqual(characters['jane.doe'].person.email)
//         expect(person?.landlinePhone).toEqual(characters['jane.doe'].person.landlinePhone)

//         const res = await request(app)
//             .put(`/api/person/${personId}`)
//             .send({
//                 person: {
//                     ...goodParams,
//                 }
//             })
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)

//         const updatedPerson = await Persons.findOne({
//             where: {
//                 personId: personId
//             }
//         })

//         expect(updatedPerson?.personId).toEqual(personId)
//         expect(updatedPerson?.firstname).toEqual(goodParams.firstname)
//         expect(updatedPerson?.lastname).toEqual(goodParams.lastname)
//         expect(updatedPerson?.gender).toEqual(goodParams.gender)
//         expect(updatedPerson?.mobilePhone).toEqual(goodParams.mobilePhone)
//         expect(updatedPerson?.email).toEqual(goodParams.email)
//         expect(updatedPerson?.landlinePhone).toEqual(goodParams.landlinePhone)
//     })


// })

// // ! DONE
// describe('ROUTE (DELETE): /api/person/:id (Delete person)', () => {

//     afterEach(clearDatabase);

//     it('Wrong format personId', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             null,
//             undefined,
//             "wrongPersonIdFormat",
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .delete(`/api/person/${wrongParam}`)
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

//     it('Wrong personId (person not found)', async () => {

//         const token = await initUser('john.doe')

//         const res = await request(app)
//             .delete(`/api/person/${-10}`)
//             .set('Authorization', `Bearer ${token}`);
//         expect(res.status).toEqual(404)
//     })

//     it('Good usage', async () => {

//         const token = await initUser('john.doe')

//         const personId = await createPerson('jane.doe')

//         const person = await Persons.findOne({
//             where: {
//                 personId: personId
//             }
//         })

//         expect(person).toBeTruthy()

//         const res = await request(app)
//             .delete(`/api/person/${personId}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)

//         const deletedUser = await Persons.findOne({
//             where: {
//                 personId: personId
//             }
//         })

//         expect(deletedUser).not.toBeTruthy()
//     })

// })