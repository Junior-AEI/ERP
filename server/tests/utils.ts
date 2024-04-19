import { sequelize, sequelizeClose, sequelizeInit } from '../src/config/database.config';

export async function beforeAllTests() {
    await sequelizeInit()
}

export async function afterAllTests() {
    await sequelizeClose()
}

export async function clearDatabase() {
    await sequelize.truncate();
}

export async function showErrorMessage(res: any) {
    console.error("showErrorMessage");
    console.error(res.body.message ? res.body.message : "No error message" + "\n\n")
}