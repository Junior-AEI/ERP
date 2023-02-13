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
Migrations are managed by [umzug](https://github.com/sequelize/umzug) package. In this project, they can be launched by `npm run migrate` (for migrations) and `npm run seed`. Main commands are `up` to apply all migrations/seeders and `down` to revert **one** migration/seeder. All options can be get with `--help` options.

