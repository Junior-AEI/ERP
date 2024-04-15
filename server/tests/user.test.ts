const request = require('supertest')
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createUser } from './seeders/user.seeders'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import Users from "../src/models/user.model"

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
// describe('ROUTE (GET): /api/user (Get all users)', () => {

//     afterEach(clearDatabase);

//     it('Normal usage', async () => {

//         await createUser('john.doe')
//         await createUser('jane.doe')

//         const token = await createToken("john.doe");

//         const res = await request(app)
//             .get('/api/user')
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)
//         expect(res.body.status).toEqual("success")
//         expect(res.body.data.users.length).toEqual(2);

//         for (let i = 0; i < 2; i++) {
//             expect(res.body.data.users[i].userId).toBeDefined();
//             expect(res.body.data.users[i].username).toBeDefined();
//             expect(res.body.data.users[i].lastLogin).toBeDefined();
//             expect(res.body.data.users[i].mandateStart).toBeDefined();
//             expect(res.body.data.users[i].mandateEnd).toBeDefined();
//             expect(res.body.data.users[i].emailJE).toBeDefined();
//             expect(res.body.data.users[i].createdAt).toBeDefined();
//             expect(res.body.data.users[i].updatedAt).toBeDefined();
//         }

//     })

// })

// ! DONE
// describe('ROUTE (GET): /api/user/:userId (Get a specific user)', () => {

//     afterEach(clearDatabase);

//     it('Wrong format', async () => {

//         const token = await initUser('john.doe')

//         const wrongFormatUserIdList = [
//             null,
//             undefined,
//             "wrongUserId"
//         ]

//         for (const wrongFormatUserId of wrongFormatUserIdList) {
//             const res = await request(app)
//                 .get(`/api/user/${wrongFormatUserId}`)
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res.status).toEqual(400)
//         }

//     })

//     it('Wrong userId with a good format', async () => {

//         const token = await initUser('john.doe')

//         const res = await request(app)
//             .get(`/api/user/${-10}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(404)
//     })

//     it('Normal usage', async () => {

//         const token = await initUser('john.doe')

//         const user = await Users.findOne({
//             where: {
//                 username: "john.doe"
//             }
//         })

//         const res = await request(app)
//             .get(`/api/user/${user?.userId}`)
//             .set('Authorization', `Bearer ${token}`);

//         expect(res.status).toEqual(200)
//         expect(res.body.status).toEqual("success")
//         expect(res.body.data.user).toBeDefined();
//         expect(res.body.data.user.userId).toEqual(user?.userId);
//         expect(res.body.data.user.username).toEqual(user?.username);
//         expect(res.body.data.user.emailJE).toEqual(user?.emailJE);
//     })

// })

describe('ROUTE (POST): /api/user (Create new user)', () => {

    afterEach(clearDatabase);

    it('Wrong format memberId', async () => {

        const token = await initUser('john.doe')

        const wrongFormatMemberIdList = [
            null,
            undefined,
            "memberId",
        ]

        for (const wrongFormatMemberId of wrongFormatMemberIdList) {
            const res = await request(app)
                .post("/api/user")
                .send({
                    user: {
                        memberId: wrongFormatMemberId
                    }
                })
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toEqual(400)
        }
    })

    it('Wrong memberId', async () => {

        const token = await initUser('john.doe')

        const res = await request(app)
            .post("/api/user")
            .send({
                user: {
                    memberId: -10
                }
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(404)
    })

    // it('Wrong params (memberId good)', async () => {

    //     const token = await initUser('john.doe')

        

    //     const wrongParamsList = [
    //         {
    //             username: null,
    //             password: 'correctPassword',
    //             mandateStart: new Date(),
    //             mandateEnd: new Date(),
    //             emailJE: "john@doe.fr"
    //         },
    //     ]

    //     for (const wrongParams of wrongParamsList) {
    //         const res = await request(app)
    //             .post("/api/user")
    //             .send({
    //                 user: {
    //                     memberId: ,
    //                     username: wrongParams.username,
    //                     password: wrongParams.password,
    //                     mandateStart: wrongParams.mandateStart,
    //                     mandateEnd: wrongParams.mandateStart,
    //                     emailJE: wrongParams.emailJE
    //                 }
    //             })
    //             .set('Authorization', `Bearer ${token}`);
    //         expect(res.status).toEqual(400)
    //     }
    // })

})
