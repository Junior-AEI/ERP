const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

import express, { Request, Response } from "express";

dotenv.config();

const app = express();

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

router.get("/user", (req: Request, res: Response) => {
  const ret = [];
  db.all("SELECT * FROM User", (err: Error | null, row: any[]) => {
    res.json(row);
  });
});

router.post("/user", (req, res) => {
  const name = req.body.name;
  db.run("INSERT INTO User VALUES (?)", [name], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
});

router.delete("/user", (req, res) => {
  const name = req.body.name;
  db.run("DELETE FROM User WHERE name = ?", [name], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});

app.use("/api", router);
