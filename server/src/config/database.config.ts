import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import config from "./sequelize.config";

// Database configuration depending of NODE_ENV variable (dev or production)
dotenv.config();
const env = process.env.NODE_ENV || "dev";
const databaseConfig = config[env];

// ORM initialization
const sequelize = new Sequelize(databaseConfig);

// Test de la connexion à la base de donnée
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
