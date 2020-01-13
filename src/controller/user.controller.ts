import { Request, Response } from "express";

import { getAllUser, loginUser } from "../services/user";

export async function login(req: Request, res: Response): Promise<void> {
  const { name, password } = req.body;

  try {
    const { token } = await loginUser(name, password);
    res.send({ token });
  } catch (e) {
    res.send({ message: `Failed Bulk operation` });
  }
}

export default { login };
