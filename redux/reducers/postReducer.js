import * as types from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REQ:
      return {
        ...state,
        posts: [],
        loading: true,
        error: null,
      };
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
