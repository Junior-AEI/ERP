# Requirements

```
node >= 14.0.0
```

# Installation

```bash
cd client
npm install
cd ../server
npm install
cp .env.example .env
```

# Running

```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```

# Migrations

## Generality

Migrations are managed by [umzug](https://github.com/sequelize/umzug) package. In this project, they can be launched by `npm run migrate` (for migrations) and `npm run seed`. Main commands are `up` to apply all migrations/seeders and `down` to revert **one** migration/seeder.

To add option, it needs to add `--` after the commande. For example, rollback all migrations can be done with `npm run migrate -- down --to 0`.

## Main options

```sh
npm run migrate -- up                   #Up all migrations
npm run migrate -- up --to <n>          #Up to the n-th migration
npm run migrate -- down                 #Down last migration
npm run migrate -- down --to <n>        #Down all migration to n-th migration
npm run migrate -- create --name=<Name> #Generate new empty migration from template

npm run seed -- up                      #Up all seeders
npm run seed -- up --to <n>             #Up to the n-th seeder
npm run seed -- down                    #Down last seeder
npm run seed -- down --to <n>           #Down all seeders to n-th seeder
npm run seed -- create --name=<Name>    #Generate new empty seeder from template
```

All options can be get with `--help` options.s
