const request = require('supertest')

import { sequelizeInit, sequelizeClose } from '../src/config/database.config'

import app from "../src/app";
import { createUser } from './seeders/user.seeders';
import { clearDatabase } from './utils';

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/login', () => {

    afterEach(clearDatabase);

    it('Bad informations', async () => {

        await createUser();

        const badInformationsList = [
            // Empty
            {
                username: "",
                password: "",
            },
            // Wrong
            {
                username: "john",
                password: "123",
            },
            // Bad password
            {
                username: "john.doe",
                password: "bad_mdp",
            },
            // ...
        ]

        badInformationsList.map(async (badInformations) => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: badInformations.username,
                    password: badInformations.password
                })
            expect(res.status).toEqual(401);
            expect(res.body.status).toEqual("error");
        })

    })

    it('Good informations', async () => {

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


