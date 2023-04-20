"use strict";
/*
 * Describes dev and prod database configurations for Sequelize
 * Must be build after each modification and before any execution or building
 */
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var configuration = {
    // Dev database configuration (SQLite)
    dev: {
        storage: "database/database.sqlite",
        dialect: "sqlite",
        models: [__dirname + "/../models"],
    },
    // Test database configuration (SQLite)
    test: {
        storage: "database/database.sqlite",
        dialect: "sqlite",
        models: [__dirname + "/../models"],
    },
    // Prod database server configuration (from .env file)
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        host: process.env.DB_HOST,
        dialect: "mysql",
    },
};
module.exports = configuration;
