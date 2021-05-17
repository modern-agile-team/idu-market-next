import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  TRADE_COMMENT_GET_REQUEST,
  TRADE_COMMENT_GET_SUCCESS,
  TRADE_COMMENT_GET_FAILURE,
  TRADE_COMPLETE_REQUEST,
  TRADE_COMPLETE_SUCCESS,
  TRADE_COMPLETE_FAILURE,
} from "../types";

//Trade Comment Get
function tradeCommentGetAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/comments`
  );
}

function* tradeCommentGet(action) {
  try {
    const result = yield call(tradeCommentGetAPI, action.payload);

    console.log(result);

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

//Trade Complete
function tradeCompleteAPI(payload) {
  const boardNum = payload.boardNum;
  const studentId = payload.studentId;

  const body = {
    boardNum,
    studentId,
  };

  console.log(body);
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/purchase-list`,
    body
  );
}

function* tradeComplete(action) {
  try {
    const result = yield call(tradeCompleteAPI, action.payload);

    console.log(result);
    yield put({
      type: TRADE_COMPLETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TRADE_COMPLETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchTradeCommentGet() {
  yield takeEvery(TRADE_COMMENT_GET_REQUEST, tradeCommentGet);
}

function* watchTradeComplete() {
  yield takeEvery(TRADE_COMPLETE_REQUEST, tradeComplete);
}

export default function* tradeSaga() {
  yield all([fork(watchTradeCommentGet), fork(watchTradeComplete)]);
}
