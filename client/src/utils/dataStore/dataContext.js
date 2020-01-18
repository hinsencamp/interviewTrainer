import React, { createContext, useContext, useReducer } from "react";

import { fetchQuestions, fetchQuestionsById, login as loginUser } from "../api";
import { questionReducer, initialState } from "./questionsReducer";
import {
  createLoadedQuestionsAction,
  createLoadedTrainingSet,
  createSearchAction,
  createUserAction
} from "./questionActions";

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

/* Export a component to provide the context to its children. This is used in our _app.js file */
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

/* 
Default export is a hook that provides a simple API for updating the global state. 
This also allows us to keep all of this state logic in this one file
*/

// TODO: https://coshx.com/storing-jwt-tokens-in-your-react-frontend
// TODO: change logic from promise chain to async await for readability

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const login = (name, pw) => {
    loginUser(name, pw)
      .then(user => {
        dispatch(createUserAction(user));
      })
      .catch(err => {
        console.log("user", err);
      });
  };

  const fetchTrainingSet = (ids = []) => {
    fetchQuestionsById(ids)
      .then(questions => {
        dispatch(createLoadedTrainingSet(questions));
      })
      .catch(error => {
        throw Error("question not fetched");
      });
  };

  // TODO: change name to indicate async behaviour
  const setQuestions = searchTerm => {
    dispatch(createSearchAction(searchTerm));
    fetchQuestions(searchTerm)
      .then(questions => {
        dispatch(createLoadedQuestionsAction(questions));
      })
      .catch(error => {
        throw Error("question not fetched");
      });
  };

  return {
    setQuestions,
    fetchTrainingSet,
    login,
    token: state.user.token,
    user: state.user,
    trainingSet: state.trainingSet,
    questions: [...state.questions],
    searchTerm: state.searchTerm
  };
};

export default useGlobalState;
