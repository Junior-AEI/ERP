const request = require('supertest')

import { sequelizeInit, sequelizeClose } from '../src/config/database.config'

import app from "../src/app";
import { createUser } from './seeders/user.seeders';
import { clearDatabase } from './utils';
import Tokens from '../src/models/token.model';
import Users from '../src/models/user.model';

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/login', () => {

    afterEach(clearDatabase);

    it('Wrong informations', async () => {

        await createUser();

        const wrongInformationsList = [
            // Void
            {
                username: null,
                password: null,
            },
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
            // wrong password
            {
                username: "john.doe",
                password: "wrong_mdp",
            },
            // ...
        ]

        wrongInformationsList.map(async (wrongInformations) => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: wrongInformations.username,
                    password: wrongInformations.password
                })
            expect(res.status).toEqual(401);
            expect(res.body.status).toEqual("error");
        })

    })

    it('Good usage', async () => {

        await createUser();

        const res = await request(app)
            .post('/api/login')
            .send({
                username: "john.doe",
                password: 'mdp'
            })
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.data.token).toBeDefined();

    })

})


describe('ROUTE: /api/forget', () => {

    afterEach(clearDatabase);

    it('Wrong username', async () => {

        const wrongUsernameList = [
            null, // Void
            "", // Empty
            "john.doe", // Filled
            // ...
        ]

        wrongUsernameList.map(async (wrongUsername) => {
            const res = await request(app)
                .post('/api/forget')
                .send({
                    username: wrongUsername,
                })
            expect(res.status).toEqual(404);
            expect(res.body.status).toEqual("error");
        })

    })

    it('Good usage', async () => {

        await createUser();

        const res = await request(app)
            .post('/api/forget')
            .send({
                username: "john.doe",
            })

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.data.token).toBeDefined();
        
        const user = await Users.findOne({
            where: {
                username: "john.doe"
            }
        })
        
        const tokenDb = await Tokens.findOne({
            where: {
                userId: user?.userId
            }
        })
        
        // Token has been recorded in the db
        expect(res.body.data.token).toEqual(tokenDb?.token);

    })

})




