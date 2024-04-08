const request = require('supertest')

import { sequelizeInit, sequelizeClose } from '../src/config/database.config'

const app = require('../src/index')

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/auth/login', () => {

    it('Bad informations', async () => {
        console.log(app)
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: "Mathieu",
                password: 'mdp'
            })
        console.log(res);
        // expect(res1.statusCode).toEqual(201);
        // expect(res1.body.status).toEqual(STATUS_SUCCESS);
    })

    // it('/forget', async () => {

    // })

    // it('/new-password', async () => {

    // })
})


