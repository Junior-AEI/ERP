import { db } from "../config/database.config";
import { Request, Response } from "express";

const userController = {
  getUser,
  addUser,
  deleteUser,
};

function getUser(req: Request, res: Response) {
  const ret = [];
  console.log("userController.getUser");
  db.all("SELECT * FROM User", (err: Error | null, row: any[]) => {
    res.json(row);
  });
}

function addUser(req: Request, res: Response) {
  const name = req.body.name;
  db.run("INSERT INTO User VALUES (?)", [name], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
}

function deleteUser(req: Request, res: Response) {
  const name = req.body.name;
  db.run("DELETE FROM User WHERE name = ?", [name], (err: Error | null) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: "success", data: { name } });
    }
  });
}

export default userController;
