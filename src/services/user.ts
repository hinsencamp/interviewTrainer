// add the user service to the docker-compose file
// --> how to update the user service then though?

// create functions to interact with the user service.

// it should proxy requests from the frontend further to the auth service.
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

interface isUserAuthenticatedResponse {
  status: number;
  message: string;
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

export async function isUserAuthenticated(
  token: string | undefined
): Promise<isUserAuthenticatedResponse> {
  if (!token) {
    throw new Error("no token received");
  }

  try {
    const res = await fetch(config.authURL + "/auth/verify", {
      method: "GET",
      headers: {
        authentication: `${token}`
      }
    });
    return { status: res.status, message: res.statusText };
  } catch (e) {
    throw new Error(e);
  }
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
