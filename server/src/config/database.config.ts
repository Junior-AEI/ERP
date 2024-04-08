import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import config from './sequelize.config'
import createFakeData from './../seeders'

// Database configuration depending of NODE_ENV variable (dev or production)
let sequelize: Sequelize
const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export const sequelizeInit = async () => {
    dotenv.config()
    const env = process.env.NODE_ENV || 'dev'
    const databaseConfig = config[env]
    // ORM initialization
    sequelize = new Sequelize(databaseConfig)
    await sequelize.sync({ force: true })
    await testConnection()
    if (env !== "test") await createFakeData()
}

export const sequelizeClose = async () => {
    await sequelize.close();
}

export { sequelize }
