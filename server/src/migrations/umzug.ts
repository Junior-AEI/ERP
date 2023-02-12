
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../config/database.config';

export const migrator = new Umzug({
  migrations: {
    glob: ['../../database/migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ['../../database/seeders/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;