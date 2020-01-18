const API = "http://localhost:3000/api/";
const LOGIN = "login";
const AUTH = "authenticate";
const MULTI = "multi-field?query=";
const QUESTIONS = "questionById?ids=";

// TODO: create abstraction for setting Headers

interface User {
  userId: string;
  name: string;
  role: string;
  token: string;
}

interface Questions {
  _id: string;
  _source: object;
}

export async function login(name: string, password: string) {
  const res = await fetch(API + LOGIN, {
    method: "POST",
    body: JSON.stringify({ name, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const results = await res.json();
  return results;
}

export async function isAuthenticated(user: User): Promise<Boolean> {
  if (!user.token) {
    console.log("authentication failed");
    return false;
  }

  try {
    const res = await fetch(API + AUTH + `?id=${user.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    return res.status === 200;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// TODO: CRUD logic wrapper and only do data transformation here.
export async function fetchQuestions(searchTerm: string) {
  const res = await fetch(API + MULTI + searchTerm);
  const results = await res.json();
  return results.result.map(({ _id, _source }: Questions) => ({
    id: _id,
    ..._source
  }));
}

export async function fetchQuestionsById(questionIds: string[] | string) {
  const res = await fetch(
    API +
      QUESTIONS +
      `${
        typeof questionIds === "string"
          ? questionIds
          : JSON.stringify(questionIds)
      }`
  );

  const results = await res.json();
  return results.result.map(({ _id, _source }: Questions) => ({
    id: _id,
    ..._source
  }));
}
