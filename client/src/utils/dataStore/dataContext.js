import React, { createContext, useContext, useReducer } from "react";
import { fetchQuestions } from "../api";
/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
  categories: [],
  questions: []
};

/* Action Types */
const SET_QUESTIONS = "SET_QUESTIONS";
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_SEARCHTERM = "SET_SEARCHTERM";

/* Define a context and a reducer for updating the context */

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: [...action.payload]
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload]
      };
    default:
      return state;
  }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

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
  // TODO: add all provider logic here.
  const setQuestions = searchTerm =>
    fetchQuestions(searchTerm)
      .then(questions => {
        dispatch({
          type: SET_QUESTIONS,
          payload: questions
        });
        dispatch({
          type: SET_SEARCHTERM,
          payload: searchTerm
        });
      })
      .catch(error => {
        throw Error("question not fetched");
      });

  return {
    setQuestions,
    questions: [...state.questions]
  };
};

export default useGlobalState;
