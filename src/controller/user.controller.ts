import { Request, Response } from "express";

import { getAllUser, isUserAuthenticated, loginUser } from "../services/user";

export async function login(req: Request, res: Response): Promise<void> {
  const { name, password } = req.body;

  try {
    const { token } = await loginUser(name, password);
    res.send({ token });
  } catch (e) {
    res.send({ message: `Failed Bulk operation` });
  }
}

export async function isAuthenticated(
  req: Request,
  res: Response
): Promise<void> {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    res.status(404).send({ message: "token undefined" });
    return;
  }

  const tokenArray = token.split(" "); // splits in "bearer" and the token itself
  console.log("token reaching the backend", tokenArray);
  try {
    const result = await isUserAuthenticated(tokenArray[1]);
    console.log("authService result", result);
    res.status(200).send({ ...result });
  } catch (e) {
    res.status(404).send({ message: e });
  }
}

export default { login, isAuthenticated };
