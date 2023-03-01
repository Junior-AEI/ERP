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


## Steps to create a new model 
### Step 1 : create a model file in the models folder 

The model need to be in typescript.
It use decorators, more information on them [here](https://www.npmjs.com/package/sequelize-typescript) 
The `createdAt` and `insertedAt` need to look like the other models and the same for id. 

### Step 2 : create a migration file 

Create a migration file using the command `npm run migrate -- create --name=<name_migration>.ts`.
In the model file, add the following code at the end "console.log(<yourmodel>.getAttributes())".
Copy the result in the migration file and remove the unecessary parts (look in other migration file for inspiration).
Remember to edit the down function to cancel your modifications. 
Try your migration with `npm run migrate -- up` and look in the database.
Don't forget to check if the down function work too with the command `npm run migrate -- down`.

### Step 3 : Add data in your new database

Use the following command to create a seeder file `npm run seed -- create --name=<Name>`.
Add your data following the structure of your model. 
Try it with the command `npm run migrate -- up`. 
Don't forget to check if the down function work too with the command `npm run seed -- down`.

### Step 4 : create a controller 

Create your CRUD functions in this new file (in the controller folder).
Remember to check the coding convention for the route. 
[Here more information on some useful functions in Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
Don't forget to export your new functions !

### Step 5 : create routes

Create a new file in the routes folder. 
Add the route for the new functions you created in the previous step. 
Don't forget to update the `route.ts` file with your new route. 

### Step 6 : Try what you did 

Try your function using Postman (example of url `http://localhost:5000/api/utilisateur`).
How to test your route with token comming soon. 