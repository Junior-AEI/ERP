const request = require('supertest')

import { sequelizeInit, sequelizeClose } from '../src/config/database.config'

import app from "../src/app";
import { createUser } from './seeders/user.seeders';

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/login', () => {

    it('Bad informations', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                username: "john",
                password: 'mdp'
            })
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual("error");
    })

    it('/Good informations', async () => {

        await createUser();

        const res = await request(app)
            .post('/api/login')
            .send({
                username: "john.doe",
                password: 'mdp'
            })
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
    })

})


