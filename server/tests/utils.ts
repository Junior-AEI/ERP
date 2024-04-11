import { sequelize } from '../src/config/database.config';

export async function clearDatabase() {
    await sequelize.truncate();
}