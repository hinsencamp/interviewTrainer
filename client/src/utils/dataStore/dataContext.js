import React, { createContext, useContext, useReducer } from "react";

import {
  fetchQuestions,
  fetchQuestionsById,
  fetchToken as fetchTokenAPI
} from "../api";
import { questionReducer, initialState } from "./questionsReducer";
import {
  createLoadedQuestionsAction,
  createLoadedTrainingSet,
  createSearchAction
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

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const fetchToken = (name, pw) => {
    fetchTokenAPI(name, pw)
      .then(user => {
        console.log("user", user);
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
    fetchToken,
    trainingSet: state.trainingSet,
    questions: [...state.questions],
    searchTerm: state.searchTerm
  };
};

export default useGlobalState;
