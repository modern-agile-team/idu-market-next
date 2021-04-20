import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";

const initialState = {
  jwt: null,
  isLoading: false,
  successMsg: "",
  loginErrorMsg: "",
  registerErrorMsg: "",
  checkLogin: false,
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
        checkLogin: true,
      };

    case LOGIN_FAILURE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isLoading: false,
        successMsg: "",
        loginErrorMsg: action.payload.data.msg,
        checkLogin: false,
      };
    default:
      return state;
  }
};

export default auth;
