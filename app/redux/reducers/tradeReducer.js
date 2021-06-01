import {
  TRADE_COMMENT_GET_REQUEST,
  TRADE_COMMENT_GET_SUCCESS,
  TRADE_COMMENT_GET_FAILURE,
} from "../types";

const initialState = {
  buyers: null,
  loading: false,
  msg: "",
};

const trade = (state = initialState, action) => {
  switch (action.type) {
    case TRADE_COMMENT_GET_REQUEST:
      return {
        ...state,
        loading: true,
        msg: "",
      };

    case TRADE_COMMENT_GET_SUCCESS:
      return {
        ...state,
        buyers: action.payload.buyers,
        loading: false,
        msg: action.payload.msg,
      };

    case TRADE_COMMENT_GET_FAILURE:
      return {
        ...state,
        loading: false,
        buyers: null,
        msg: action.payload.data.msg,
      };

    default:
      return state;
  }
};

export default trade;
