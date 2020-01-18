import { Request } from "express";
import fetch from "node-fetch";
import config from "../config";

interface User {
  _id: string;
  password: string;
  name: string;
  role: string;
  __v: number;
}

interface LoginResponse {
  token: string;
}

export async function loginUser(
  name: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await fetch(config.authURL + "/auth/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const results = await res.json();
    return results;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUserById(userId: string): Promise<void> {
  try {
    const res = await fetch(config.authURL + "/user/" + userId);
    console.log("user fetched", res);
    const results = await res.json();
    return results;
  } catch (e) {
    throw new Error(e);
  }
}

export async function isAuthenticated(
  headers: Request["headers"]
): Promise<object> {
  return new Promise(async (resolve, reject) => {
    const token: string | undefined = headers.authorization;
    if (!token) {
      return reject({ message: "token missing" });
    }
    // splits in "bearer" and the token itself
    const tokenArray = token.split(" ");

    try {
      const res = await fetch(config.authURL + "/auth/verify", {
        method: "GET",
        headers: {
          authentication: `${tokenArray[1]}`
        }
      });
      if (res.status === 200) {
        resolve({ message: "user is authenticated" });
      } else {
        reject(res);
      }
    } catch (e) {
      reject({ message: e });
    }
  });
}

export async function getAllUser(): Promise<[]> {
  try {
    const res = await fetch(config.authURL + "/user/all");
    const results = await res.json();
    return results;
  } catch (e) {
    throw new Error(e);
  }
}
