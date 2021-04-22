import {
  LOGIN_CHECK_FAILURE,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_REQUEST,
} from "../types";

const initialState = {
  jwt: null,
  isLoading: false,
  id: "",
  email: "",
  name: "",
  profilePath: "",
  isAdmin: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHECK_REQUEST:
      return {
        ...state,
      };

    case LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        jwt: localStorage.getItem("jwt"),
        isLoading: false,
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.name,
        profilePath: action.payload.user.profilePath,
        isAdmin: action.payload.user.isAdmin,
      };

    case LOGIN_CHECK_FAILURE:
      return {
        ...state,
        jwt: null,
        isLoading: false,
        id: "",
        email: "",
        name: "",
        profilePath: "",
        isAdmin: "",
      };
    default:
      return state;
  }
};

export default auth;
