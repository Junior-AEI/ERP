import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("erp", "root", "root", {
  dialect: 'sqlite',
  storage: 'database/database.sqlite',
  logging: console.log
});

let testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export { sequelize };
/*function populateDatabase() {
  db.serialize(() => {
    db.run("CREATE TABLE User (name TEXT)");
    const stmt = db.prepare("INSERT INTO User VALUES (?)");

    for (let i = 0; i < 5; i++) {
      stmt.run(`Name ${i}`);
    }

    stmt.finalize();
  });
}*/

// export { db, populateDatabase };
