/*
 * Describes dev and prod database configurations for Sequelize
 * Must be build after each modification and before any execution or building
 */

import { config } from "dotenv";
import { SequelizeOptions } from "sequelize-typescript";
config();

const configuration: { [key: string]: SequelizeOptions } = {
  // Dev database configuration (SQLite)
  dev: {
    storage: "database/database.sqlite",
    dialect: "sqlite",
    models: ["./src/models/**/"],
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

// export with "=" version for CommonJS version building of sequelize.config.js (module.exports)
export = configuration;