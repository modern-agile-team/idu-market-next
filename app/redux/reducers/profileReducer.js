import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_FAILURE,
} from "../types";

const initialState = {
  profile: null,
  loading: false,
  msg: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
    case PROFILE_IMAGE_UPDATE_REQUEST:
    case PROFILE_GET_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "",
      };

    case PROFILE_GET_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
        msg: action.payload.msg,
      };

    case PROFILE_GET_FAILURE:
      return {
        ...state,
        loading: false,
        profile: null,
        msg: action.payload.data.msg,
      };

    case PROFILE_IMAGE_UPDATE_SUCCESS:
      localStorage.removeItem("jwt");
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, profilePath: action.payload.profilePath },
        msg: action.payload.msg,
      };

    case PROFILE_IMAGE_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
      };

    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case  PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        profile: null,
        msg: action.payload.data.msg,
      };
    default:
      return state;
  }
};

export default profile;
