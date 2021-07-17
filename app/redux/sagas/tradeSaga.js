import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { API_KEY } from "../../Data/API_KEY";
import {
  TRADE_COMMENT_GET_REQUEST,
  TRADE_COMMENT_GET_SUCCESS,
  TRADE_COMMENT_GET_FAILURE,
} from "../types";

//Trade Comment Get
function tradeCommentGetAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/comments`,
    {
      headers: {
        "api-key": API_KEY,
      },
    }
  );
}

function* tradeCommentGet(action) {
  try {
    const result = yield call(tradeCommentGetAPI, action.payload);

    yield put({
      type: TRADE_COMMENT_GET_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TRADE_COMMENT_GET_FAILURE,
      payload: e.response,
    });
  }
}

function* watchTradeCommentGet() {
  yield takeEvery(TRADE_COMMENT_GET_REQUEST, tradeCommentGet);
}

export default function* tradeSaga() {
  yield all([fork(watchTradeCommentGet)]);
}
