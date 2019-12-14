import { SET_QUESTIONS, SET_SEARCHTERM } from "./actionConst";

type state = ReturnType<typeof questionReducer>;

export const initialState = {
  categories: [],
  questions: [],
  searchTerm: "javascript"
};

/* Define a context and a reducer for updating the context */
export const questionReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: [...action.payload]
      };
    case SET_SEARCHTERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};
