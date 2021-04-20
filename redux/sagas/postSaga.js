import { GET_POSTS, GET_REQ } from "../types";
import { all, fork, put, takeEvery } from "redux-saga/effects";

function* post() {
  yield put({
    type: GET_POSTS,
    payload: ["1st post", "2nd posts", "3 posts"],
  });
}

function* watchPost() {
  yield takeEvery(GET_REQ, post);
}

//authSaga() 여러 Saga 통합
export default function* postSaga() {
  yield all([fork(watchPost)]);
}
