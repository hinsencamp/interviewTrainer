import { SET_SEARCHTERM, SET_QUESTIONS, SET_TRAINING } from "./actionConst";

export const createSearchAction = searchTerm => ({
  type: SET_SEARCHTERM,
  payload: searchTerm
});

export const createLoadedQuestionsAction = questions => ({
  type: SET_QUESTIONS,
  payload: questions
});

export const createLoadedTrainingSet = questions => ({
  type: SET_TRAINING,
  payload: questions
});
