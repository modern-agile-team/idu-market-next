import {
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
  COMMENT_GET_FAILURE,
  COMMENT_UPLOAD_FAILURE,
  COMMENT_UPLOAD_SUCCESS,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
  REPLY_UPLOAD_REQUEST,
  REPLY_UPLOAD_SUCCESS,
  REPLY_UPLOAD_FAILURE,
} from "../types";

const initialState = {
  isLoading: false,
  msg: "",
  comments: [],
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
      };

    case COMMENT_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload.comments,
        msg: action.payload.msg,
      };

    case COMMENT_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.data.msg,
        comments: [],
      };

    case COMMENT_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
      };

    case COMMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
        comments: [...state.comments, action.payload.comment],
      };

    case COMMENT_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.data.msg,
      };

    case REPLY_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
      };

    case REPLY_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
      };

    case REPLY_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.data.msg,
      };

    case COMMENT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
      };

    case COMMENT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
      };

    case COMMENT_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.data.msg,
      };

    case COMMENT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
      };

    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
      };

    case COMMENT_DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export default comment;
