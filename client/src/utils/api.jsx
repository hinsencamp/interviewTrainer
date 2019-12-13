const API = "http://localhost:3000/api/";

// TODO: CRUD logic wrapper and only do data transformation here.
export async function fetchQuestions(searchTerm) {
  const res = await fetch(API + `multi-field?query=${searchTerm}`);
  const results = await res.json();
  return results.result.map(result => result._source);
}
