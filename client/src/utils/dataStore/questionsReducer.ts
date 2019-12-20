import { SET_QUESTIONS, SET_SEARCHTERM, SET_TRAINING } from "./actionConst";

type state = ReturnType<typeof questionReducer>;

export const initialState = {
  categories: [],
  questions: [],
  searchTerm: "javascript",
  trainingSet: []
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
    case SET_TRAINING:
      return {
        ...state,
        trainingSet: [...action.payload]
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
