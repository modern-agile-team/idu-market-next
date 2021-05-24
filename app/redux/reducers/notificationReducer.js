import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  NOTIFICATION_GET_REQUEST,
  NOTIFICATION_GET_SUCCESS,
  NOTIFICATION_GET_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  msg: "",
  notifications: [],
};

const notification = (state = initialState, action) => {
  switch (action.type) {
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
    case NOTIFICATION_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
        notifications: [],
      };

    default:
      return state;
  }
};

export default notification;
