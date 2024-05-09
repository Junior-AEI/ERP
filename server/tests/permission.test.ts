const request = require('supertest')
import app from '../src/app'
import { beforeAllTests, afterAllTests, clearDatabase, showErrorMessage } from './utils'
import { createToken } from './seeders/token.seeders'
import { initUser } from './seeders/general'
import { characters } from './seeders/data/characters.data'
import { createdAddress } from './seeders/address.seeders'
import Addresses from '../src/models/address.model'
import { createPermission } from './seeders/permission.seeders'

beforeAll(beforeAllTests)
afterAll(afterAllTests)

// ! DONE
describe('ROUTE (GET): /api/permission (Get all permissions)', () => {
    afterEach(clearDatabase)

    it('Normal usage', async () => {

        await createPermission('permission_1')
        await createPermission('permission_2')
        await createPermission('permission_3')

        const token = await initUser('john.doe')

        const res = await request(app).
            get('/api/permission').
            set('Authorization', `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('success')

        expect(res.body.data.permissions.length).toEqual(3)

        for (let i = 0; i < 3; i++) {
            expect(res.body.data.permissions[i].permissionId).toBeDefined()
            expect(res.body.data.permissions[i].permissionName).toBeDefined()
            expect(res.body.data.permissions[i].permissionType).toBeDefined()
            expect(res.body.data.permissions[i].createdAt).toBeDefined()
            expect(res.body.data.permissions[i].updatedAt).toBeDefined()
        }
    })
})
