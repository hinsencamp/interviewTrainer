const API = "http://localhost:3000/api/";

interface Questions {
  _id: string;
  _source: object;
}

export async function fetchToken(name: string, password: string) {
  const res = await fetch(API + `login`, {
    method: "POST",
    body: JSON.stringify({ name, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const results = await res.json();
  return results;
}

// TODO: CRUD logic wrapper and only do data transformation here.
export async function fetchQuestions(searchTerm: string) {
  const res = await fetch(API + `multi-field?query=${searchTerm}`);
  const results = await res.json();
  return results.result.map(({ _id, _source }: Questions) => ({
    id: _id,
    ..._source
  }));
}

export async function fetchQuestionsById(questionIds: string[] | string) {
  const res = await fetch(
    API +
      `questionById?ids=${
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
