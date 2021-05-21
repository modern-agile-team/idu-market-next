import axios from "axios";
import { all, fork, put, takeEvery, call, delay } from "redux-saga/effects";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
} from "../types";

//Profile Get
function notificationPostAPI(payload) {
  const studentId = payload;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${studentId}`
  );
}

function* notificationPost(action) {
  try {
    const result = yield call(notificationPostAPI, action.payload);

    yield put({
      type: NOTIFICATION_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION_FAILURE,
      payload: e.response,
    });
  }
}

function* watchNotificationPost() {
  yield takeEvery(NOTIFICATION_REQUEST, notificationPost);
}

export default function* notificationSaga() {
  yield all([fork(watchNotificationPost)]);
}
