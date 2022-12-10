const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database(":memory:");

const router = express.Router();

app.use(bodyParser.json({ limit: "50mb" }));

db.serialize(() => {
  db.run("CREATE TABLE User (name TEXT)");
  const stmt = db.prepare("INSERT INTO User VALUES (?)");

  for (let i = 0; i < 5; i++) {
    stmt.run(`Name ${i}`);
  }

  stmt.finalize();
});

router.get("/user", (req, res) => {
  const ret = [];
  db.all("SELECT * FROM User", (err, row) => {
    res.json(row);
  });
});

router.post("/user", (req, res) => {
  const name = req.body.name;
  db.run("INSERT INTO User VALUES (?)", [name], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
});

router.delete("/user", (req, res) => {
  const name = req.body.name;
  db.run("DELETE FROM User WHERE name = ?", [name], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api", router);
