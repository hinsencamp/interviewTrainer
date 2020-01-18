import {
  SET_SEARCHTERM,
  SET_QUESTIONS,
  SET_TRAINING,
  SET_USER
} from "./actionConst";

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

export const createUserAction = user => ({ type: SET_USER, payload: user });
