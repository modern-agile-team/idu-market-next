import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_CHECK_FAILURE,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_REQUEST,
} from "../types";

const initialState = {
  jwt: null,
  isLoading: false,
  successMsg: "",
  loginErrorMsg: "",
  registerErrorMsg: "",
  checkRegister: false,
  id: "",
  email: "",
  name: "",
  exp: "",
  iss: "",
  profilePath: "",
  isAdmin: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHECK_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        checkLogin: false,
        loginErrorMsg: "",
        registerErrorMsg: "",
        successMsg: "",
        id: "",
        email: "",
        name: "",
        exp: "",
        iss: "",
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        jwt: action.payload.jwt,
        isLoading: false,
        successMsg: action.payload.msg,
        loginErrorMsg: "",
      };

    case LOGIN_FAILURE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isLoading: false,
        successMsg: "",
        loginErrorMsg: action.payload.data.msg,
      };
    case LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        jwt: localStorage.getItem("jwt"),
        isLoading: false,
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.name,
        exp: action.payload.user.exp,
        iss: action.payload.user.iss,
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
        exp: "",
        iss: "",
        profilePath: "",
        isAdmin: "",
      };
    default:
      return state;
  }
};

export default auth;
