import { Request, Response } from "express";
import { User } from "../models/user.model";
const userController = {
  getUser,
  addUser,
  deleteUser,
};

async function getUser(req: Request, res: Response) {
  await User.findAll().then((users) => res.json(users));
}

async function addUser(req: Request, res: Response) {
  await User.create({ name: req.body.name })
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

async function deleteUser(req: Request, res: Response) {
  await User.destroy({ where: { name: req.body.name } })
    .then(() => res.json(req.body.name))
    .catch((err) => res.status(500).json({ error: err.message }));
}

export default userController;
