import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.NODE_ENV === "dev" ? (process.env.DB_DEV as string) : "",
  process.env.NODE_ENV === "dev" ? (process.env.DB_DEV_USER as string) : "",
  process.env.NODE_ENV === "dev" ? (process.env.DB_DEV_PASSWORD as string) : "",
  {
    dialect: "mysql",
    host: process.env.NODE_ENV === "dev" ? "localhost" : "",
  }
);

let testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export { sequelize };
