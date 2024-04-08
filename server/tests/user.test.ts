const request = require('supertest')
import { sequelizeInit, sequelizeClose } from '../src/config/database.config'
import app from "../src/app"
import { clearDatabase } from './utils'
import { createUser } from './seeders/user.seeders';
import { createToken } from './seeders/token.seeders';

beforeAll(async () => {
    await sequelizeInit()
});

afterAll(async () => {
    await sequelizeClose();
});

describe('ROUTE: /api/user (Get all users)', () => {

    afterEach(clearDatabase);

    it('Normal usage', async () => {

        await createUser('johnDoe')
        await createUser('janeDoe')

        const token = await createToken("john.doe");

        const res = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual("success")
        expect(res.body.data.users.length).toEqual(2);
        
        for (let i = 0; i < 2; i++) {
            expect(res.body.data.users[i].userId).toBeDefined();
            expect(res.body.data.users[i].username).toBeDefined();
            expect(res.body.data.users[i].lastLogin).toBeDefined();
            expect(res.body.data.users[i].mandateStart).toBeDefined();
            expect(res.body.data.users[i].mandateEnd).toBeDefined();
            expect(res.body.data.users[i].emailJE).toBeDefined();
            expect(res.body.data.users[i].createdAt).toBeDefined();
            expect(res.body.data.users[i].updatedAt).toBeDefined();
        }

    })

})

