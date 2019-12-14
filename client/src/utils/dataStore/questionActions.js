import { SET_SEARCHTERM, SET_QUESTIONS } from "./actionConst";

export const createSearchAction = searchTerm => ({
  type: SET_SEARCHTERM,
  payload: searchTerm
});

export const createLoadedQuestionsAction = questions => ({
  type: SET_QUESTIONS,
  payload: questions
});
