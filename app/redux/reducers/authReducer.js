import {
  LOGIN_CHECK_FAILURE,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../types";

const initialState = {
  jwt: null,
  isLoading: false,
  id: "",
  email: "",
  name: "",
  profilePath: "",
  isAdmin: "",
  msg: "",
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
        msg: action.payload.user.msg,
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
        msg: "",
      };

    case LOGOUT_REQUEST:
    case LOGOUT_FAILURE:
      return {
        ...state,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isLoading: false,
        msg: "로그아웃에 성공하셨습니다.",
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
