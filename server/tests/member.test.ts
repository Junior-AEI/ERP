const request = require('supertest')
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { characters } from "./seeders/data/characters.data"
import { createPerson } from "./seeders/person.seeders "
import Persons from "../src/models/person.model"
import { createMember } from "./seeders/member.seeders"
import Members from "../src/models/member.model"

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/member (Get all member)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {

        await initUser('john.doe')
        await createMember('jane.doe')

        const token = await createToken("john.doe");

        const res = await request(app)
            .get('/api/member')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.members.length).toEqual(2);

        for (let i = 0; i < 2; i++) {
            expect(res.body.data.members[i].memberId).toBeDefined();
            expect(res.body.data.members[i].birthDate).toBeDefined();
            expect(res.body.data.members[i].birthPlace).toBeDefined();
            expect(res.body.data.members[i].nationality).toBeDefined();
            expect(res.body.data.members[i].promotion).toBeDefined();
            expect(res.body.data.members[i].contributionDate).toBeDefined();
            expect(res.body.data.members[i].paymentMethod).toBeDefined();
            expect(res.body.data.members[i].department).toBeDefined();
            expect(res.body.data.members[i].membershipNumber).toBeDefined();
            expect(res.body.data.members[i].addressId).toBeDefined();
            expect(res.body.data.members[i].createdAt).toBeDefined();
            expect(res.body.data.members[i].updatedAt).toBeDefined();
        }

    })

})

// ! DONE
describe('ROUTE (GET): /api/member/:memberId (Get a specific member)', () => {

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
                .get(`/api/member/${wrongParam}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toEqual(400)
        }

    })

    it('Wrong memberId with a good format', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .get(`/api/person/${-10}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(404)
    })

    // it('Normal usage', async () => {

    //     const token = await initUser('john.doe')

    //     const memberId = await createMember("jane.doe")

    //     const member = await Members.findOne({
    //         where: {
    //             memberId: memberId
    //         }
    //     })

    //     const res = await request(app)
    //         .get(`/api/member/${member?.memberId}`)
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(res.status).toEqual(200)
    //     expect(res.body.data.member).toBeDefined();
    //     expect(res.body.data.member.memberId).toEqual(member?.memberId);
    //     expect(new Date(res.body.data.member.birthDate)).toEqual(new Date(characters["jane.doe"].memberBirthDate))
    //     expect(res.body.data.member.birthPlace).toEqual(characters["jane.doe"].member["birthPlace"])
    //     expect(res.body.data.member.nationality).toEqual(characters["jane.doe"].member["nationality"])
    //     expect(res.body.data.member.promotion).toEqual(characters["jane.doe"].member["promotion"])
    //     expect(res.body.data.member.contributionDate).toEqual(characters["jane.doe"].member["contributionDate"])
    //     expect(res.body.data.member.paymentMethod).toEqual(characters["jane.doe"].member["paymentMethod"])
    //     expect(res.body.data.member.department).toEqual(characters["jane.doe"].member["department"])
    //     expect(res.body.data.member.membershipNumber).toEqual(characters["jane.doe"].member["membershipNumber"])

    // })

})

// ! Big problem in database and model with permissions logic
// describe('ROUTE (POST): /api/member (Create new member)', () => {

//     afterEach(clearDatabase);

//     const goodParams = {
//         birthDate: '2002-02-12T16:00:00',
//         birthPlace: 'Paris',
//         nationality: 'FRA',
//         promotion: '2024',
//         paymentMethod: 'CB',
//         contributionDate: new Date().toISOString(),
//         department: 'Informatique',
//         membershipNumber: 2,
//     }

//     it('Wrong birthDate', async () => {

//         const token = await initUser('john.doe')

//         const wrongParamList = [
//             "",
//             null,
//             undefined,
//             "badDate"
//         ]

//         for (const wrongParam of wrongParamList) {
//             const res = await request(app)
//                 .post("/api/member")
//                 .send({
//                     member: {
//                         ...goodParams,
//                         birthDate: wrongParam,
//                     }
//                 })
//                 .set('Authorization', `Bearer ${token}`);
//             expect(res.status).toEqual(400)
//         }
//     })

// //     it('Wrong lastname', async () => {

// //         const token = await initUser('john.doe')

// //         const wrongParamList = [
// //             "",
// //             null,
// //             undefined,
// //             "lastnameToooooooooooooooooooooooooooooooooLong"
// //         ]

// //         for (const wrongParam of wrongParamList) {
// //             const res = await request(app)
// //                 .post("/api/person")
// //                 .send({
// //                     person: {
// //                         ...goodParams,
// //                         lastname: wrongParam,
// //                     }
// //                 })
// //                 .set('Authorization', `Bearer ${token}`);
// //             expect(res.status).toEqual(400)
// //         }
// //     })

// // // ! Gender not tested in person.validator.ts
// // // ! landlinePhone not tested in person.validator.ts

// //     it('Wrong mobilePhone', async () => {

// //         const token = await initUser('john.doe')

// //         const wrongParamList = [
// //             "",
// //             null,
// //             undefined,
// //             "numero",
// //             10000,
// //             1234567890123456
// //         ]

// //         for (const wrongParam of wrongParamList) {
// //             const res = await request(app)
// //                 .post("/api/person")
// //                 .send({
// //                     person: {
// //                         ...goodParams,
// //                         mobilePhone: wrongParam,
// //                     }
// //                 })
// //                 .set('Authorization', `Bearer ${token}`);
// //             expect(res.status).toEqual(400)
// //         }
// //     })

// //     it('Wrong email', async () => {

// //         const token = await initUser('john.doe')

// //         const wrongParamList = [
// //             "",
// //             100,
// //             null,
// //             undefined,
// //             "email",
// //             "jane@doe",
// //             "jane.com",
// //         ]

// //         for (const wrongParam of wrongParamList) {
// //             const res = await request(app)
// //                 .post("/api/user")
// //                 .send({
// //                     user: {
// //                         ...goodParams,
// //                         email: wrongParam,
// //                     }
// //                 })
// //                 .set('Authorization', `Bearer ${token}`);
// //             expect(res.status).toEqual(400)
// //         }
// //     })

// //     it('Good usage', async () => {

// //         const token = await initUser('john.doe')

// //         const res = await request(app)
// //         .post("/api/person")
// //         .send({
// //             person: {
// //                 ...goodParams,
// //             }
// //         })
// //         .set('Authorization', `Bearer ${token}`);

// //         expect(res.status).toEqual(200)
// //         expect(res.body.data.personId).toBeDefined()

// //         const person = await Persons.findOne({
// //             where: {
// //                 personId: res.body.data.personId
// //             }
// //         })

// //         expect(person?.personId).toEqual(res.body.data.personId)
// //         expect(person?.firstname).toEqual(goodParams.firstname)
// //         expect(person?.lastname).toEqual(goodParams.lastname)
// //         expect(person?.gender).toEqual(goodParams.gender)
// //         expect(person?.mobilePhone).toEqual(goodParams.mobilePhone)
// //         expect(person?.email).toEqual(goodParams.email)
// //         expect(person?.landlinePhone).toEqual(goodParams.landlinePhone)
// //     })

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