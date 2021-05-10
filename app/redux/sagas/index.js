import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import boardSaga from "./boardSaga";
import commentSaga from "./commentSaga";
import tradeSaga from "./tradeSaga";

//제너레이터
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(boardSaga),
    fork(commentSaga),
    fork(tradeSaga),
  ]);
}
