import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  msg: "",
};

const notification = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default notification;
