import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";

//제너레이터
export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
