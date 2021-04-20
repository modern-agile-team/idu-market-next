import { all, fork } from "redux-saga/effects";
import postSaga from "./postSaga";

//제너레이터
export default function* rootSaga() {
  yield all([fork(postSaga)]);
}
