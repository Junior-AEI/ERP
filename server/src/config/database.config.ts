import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import config from './sequelize.config'

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
    testConnection()
}

export { sequelize }
