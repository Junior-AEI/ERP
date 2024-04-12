/*
 * Describes dev and prod database configurations for Sequelize
 * Must be build after each modification and before any execution or building
 */

import { config } from 'dotenv'
import { SequelizeOptions } from 'sequelize-typescript'
config()

const configuration: { [key: string]: SequelizeOptions } = {
    // Dev database configuration (SQLite)
    dev: {
        storage: 'database/database.sqlite',
        dialect: 'sqlite',
        models: [__dirname + '/../models']
    },
    // Test database configuration (SQLite)
    test: {
        storage: 'tests/database/dbTest.sqlite',
        dialect: 'sqlite',
        models: [__dirname + '/../models'],
        logging: false
    },

    // Prod database server configuration (from .env file)
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
}

// export with "=" version for CommonJS version building of sequelize.config.js (module.exports)
export = configuration
