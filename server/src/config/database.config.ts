import sqlite3 from "sqlite3";
const { Sequelize } = require('sequelize');


const db = new sqlite3.Database(":memory:");

const sequelize = new Sequelize('sqlite::memory:');

let f = async () => {try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}

f();

function populateDatabase() {
  db.serialize(() => {
    db.run("CREATE TABLE User (name TEXT)");
    const stmt = db.prepare("INSERT INTO User VALUES (?)");

    for (let i = 0; i < 5; i++) {
      stmt.run(`Name ${i}`);
    }

    stmt.finalize();
  });
}

export { db, populateDatabase };
