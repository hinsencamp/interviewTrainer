import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "utils/cookie";
import {
  fetchQuestions,
  fetchRandomTrainingSet,
  login as loginUser
} from "../api";
import { questionReducer, initialState } from "./questionsReducer";
import {
  createLoadedQuestionsAction,
  createLoadedTrainingSet,
  createSearchAction,
  createUserAction,
  createTokenAction
} from "./questionActions";
import { useLocalStorage } from "utils/hooks";

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

/* Export a component to provide the context to its children. This is used in our _app.js file */
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const { storedValue } = useLocalStorage("user");

  // Set stored user data & auth on app mount.
  useEffect(() => {
    const storedToken = getCookie("token");

    if (storedToken) {
      dispatch(createTokenAction(storedToken));

      const storedUser = storedValue;
      dispatch(createUserAction(storedUser));
    }
  }, [storedValue]);

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
  const { setValue, removeValue } = useLocalStorage("user", {});

  const login = (name, pw) => {
    loginUser(name, pw)
      .then(({ token, ...user }) => {
        setCookie("token", token);
        dispatch(createTokenAction(token));
        setValue(user);
        dispatch(createUserAction(user));
      })
      .catch(err => {
        console.log("user", err);
      });
  };

  const logout = () => {
    dispatch(createTokenAction(""));
    removeValue();
    deleteCookie("token");
  };

  const fetchTrainingSet = (questionCount, randomSeed) => {
    fetchRandomTrainingSet(questionCount, randomSeed)
      .then(questions => {
        dispatch(createLoadedTrainingSet(questions));
      })
      .catch(error => {
        throw Error("question not fetched", error);
      });
  };

  const setQuestions = searchTerm => {
    dispatch(createSearchAction(searchTerm));
    fetchQuestions(searchTerm)
      .then(questions => {
        dispatch(createLoadedQuestionsAction(questions));
      })
      .catch(error => {
        throw Error("question not fetched", error);
      });
  };

  return {
    login,
    logout,
    setQuestions,
    fetchTrainingSet,
    user: state.user,
    token: state.token,
    trainingSet: state.trainingSet,
    questions: [...state.questions],
    searchTerm: state.searchTerm
  };
};

export default useGlobalState;
