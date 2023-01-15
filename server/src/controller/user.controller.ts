import { Request, Response } from "express";
import { User } from '../models/user.model';
const userController = {
  getUser,
  addUser,
  deleteUser,
};

async function getUser(req: Request, res: Response) {
  await User.findAll().then(users => res.json(users));

}

async function addUser(req: Request, res: Response) {
  const name = req.body.name;
  await User.create({ name: name }).then(() => res.json(name)).catch(err => res.status(500).json({ error: err.message }))
}

async function deleteUser(req: Request, res: Response) {
  const name = req.body.name;
  await User.destroy({
    where: {
      name: name,
    }
  })
}

export default userController;
