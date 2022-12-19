import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

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
