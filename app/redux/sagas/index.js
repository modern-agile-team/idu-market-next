import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import boardSaga from "./boardSaga";
import commentSaga from "./commentSaga";
import profileSaga from "./profileSaga";
import tradeSaga from "./tradeSaga";
import notificationSaga from "./notificationSaga";

//제너레이터
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(boardSaga),
    fork(commentSaga),
    fork(tradeSaga),
    fork(profileSaga),
    fork(notificationSaga),
  ]);
}
