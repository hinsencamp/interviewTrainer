import { Request, Response } from "express";

import {
  getAllUser,
  getUserById,
  loginUser,
  isAuthenticated
} from "../services/user";

interface Headers {
  authorization: string;
}

export async function login(req: Request, res: Response): Promise<void> {
  const { name, password } = req.body;

  try {
    const user = await loginUser(name, password);
    res.status(200).send({ ...user });
  } catch (e) {
    res.send({ message: `Failed Bulk operation` });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await getUserById(req.query.id);
    res.status(200).send({ message: "success", user });
  } catch (err) {
    res.status(404).send({ message: err });
  }
}

export default { login, getUser };
