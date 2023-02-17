import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../config/database.config";
import { Sequelize } from "sequelize-typescript";
import fs from "fs";
import path from "path";

interface UmzugConfig {
  migrations: {
    glob: string[] | any;
  };
  context: Sequelize;
  storage: SequelizeStorage;
  logger: any;
  models?: string[];
  create: any;
}

const config: UmzugConfig = {
  migrations: {
    glob: ["../../database/migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
  create: {
    folder: "database/migrations",
    template: (filepath: any) => [
      // read template from filesystem
      [
        filepath,
        fs
          .readFileSync(path.join(__dirname, "templates/sample-migration.ts"))
          .toString(),
      ],
    ],
  },
};

if (process.env.NODE_ENV === "dev") {
  config.models = ["../models/**/*.ts"];
}

export const migrator = new Umzug(config);

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ["../../database/seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta",
  }),
  logger: console,
  create: {
    folder: "database/seeders",
    template: (filepath: any) => [
      // read template from filesystem
      [
        filepath,
        fs
          .readFileSync(path.join(__dirname, "templates/sample-seeders.ts"))
          .toString(),
      ],
    ],
  },
});

export type Seeder = typeof seeder._types.migration;
