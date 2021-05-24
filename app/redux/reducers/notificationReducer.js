import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  NOTIFICATION_GET_REQUEST,
  NOTIFICATION_GET_SUCCESS,
  NOTIFICATION_GET_FAILURE,
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_CHANGE_SUCCESS,
  NOTIFICATION_CHANGE_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  msg: "",
  notifications: [],
  readFlag: null,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_CHANGE_REQUEST:
    case NOTIFICATION_GET_REQUEST:
    case NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "",
      };

    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };

    case NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
      };

    case NOTIFICATION_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        notifications: action.payload.notifications,
      };
    case NOTIFICATION_GET_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
        notifications: [],
      };
    case NOTIFICATION_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        readFlag: action.payload.readFlag,
      };
    case NOTIFICATION_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
        readFlag: null,
      };
    default:
      return state;
  }
};

export default notification;
