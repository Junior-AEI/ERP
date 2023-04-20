import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import config from "./sequelize.config";

// Database configuration depending of NODE_ENV variable (dev or production)
dotenv.config();
const env = process.env.NODE_ENV || "dev";
console.log(process.env.NODE_ENV);
const databaseConfig = config[env];
console.log(databaseConfig.models);
// ORM initialization
const sequelize = new Sequelize(databaseConfig);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testConnection();

export { sequelize };
