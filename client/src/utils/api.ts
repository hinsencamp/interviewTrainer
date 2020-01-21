const API = "http://localhost:3000/api/";
const LOGIN = "login";
const AUTH = "authenticate";
const MULTI = "multi-field?query=";
const QUESTIONS = "questionById?ids=";
const TRAININGSET = "trainingSet?qCount=";

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

export async function isAuthenticated(
  userId: string,
  token: string
): Promise<Boolean> {
  if (!token) {
    return false;
  }

  try {
    const res = await fetch(API + AUTH + `?id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.status === 200;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function fetchQuestions(searchTerm: string) {
  const res = await fetch(API + MULTI + searchTerm);
  const results = await res.json();
  return results.result.map(({ _id, _source }: Questions) => ({
    id: _id,
    ..._source
  }));
}

export async function fetchRandomTrainingSet(
  count: number,
  randomSeed: number
) {
  const res = await fetch(API + TRAININGSET + count + "&seed=" + randomSeed);
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
