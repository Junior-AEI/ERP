const request = require('supertest')
import app from "../src/app"
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createUser } from './seeders/user.seeders'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'

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

// ! WAITING FOR DEBUGGING
// describe('ROUTE (GET): /api/user/:userId (Get a specific user)', () => {

//     afterEach(clearDatabase);

//     it('Wrong format', async () => {

//         const token = await initUser('john.doe')

//         const wrongFormatUserIdList = [
//             null,
//             undefined,
//         ]

//         for (const wrongFormatUserId of wrongFormatUserIdList) {
//             const res = await request(app)
//                 .get(`/api/user/${wrongFormatUserId}`)
//                 .set('Authorization', `Bearer ${token}`);

//             expect(res.status).toEqual(400)
//         }

//     })

//     // ! Dans user.controller.ts: isNumber(req.params.userId) est toujours faux 
//     // ! car param dans url donc string
//     // ! --> Solution : Enlever cette condition 
//     // it('Wrong userId with a good format', async () => {

//     //     const token = await initUser('john.doe')

//     //     const res = await request(app)
//     //         .get(`/api/user/${-10}`)
//     //         .set('Authorization', `Bearer ${token}`);

//     //     expect(res.status).toEqual(404)

//     // })

// })

describe('ROUTE (POST): /api/user (Create new user)', () => {

    afterEach(clearDatabase);

    it('Wrong format memberId', async () => {

        // const token = await initUser('john.doe')

        await createUser('john.doe')
        const token = await createToken("john.doe");

        const wrongFormatMemberIdList = [
            null,
            // undefined,
            // "memberId",
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
            // showErrorMessage(res)
            expect(res.status).toEqual(400)
        }
    })

})
