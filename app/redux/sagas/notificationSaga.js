import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  NOTIFICATION_GET_REQUEST,
  NOTIFICATION_GET_SUCCESS,
  NOTIFICATION_GET_FAILURE,
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_CHANGE_SUCCESS,
  NOTIFICATION_CHANGE_FAILURE,
} from "../types";

//Notification GET
function notificationGetAPI(payload) {
  const studentId = payload.studentId;

  return axios.get(`/api/notification/${studentId}`);
}

function* notificationGet(action) {
  try {
    const result = yield call(notificationGetAPI, action.payload);

    yield put({
      type: NOTIFICATION_GET_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION_GET_FAILURE,
      payload: e.response,
    });
  }
}

//Notification PATCH
function notificationPatchAPI(payload) {
  const studentId = payload.studentId;
  const notificationNum = payload.notificationNum;

  const body = {
    notificationNum,
  };

  return axios.patch(`/api/notification/${studentId}`, body);
}

function* notificationPatch(action) {
  try {
    const result = yield call(notificationPatchAPI, action.payload);

    yield put({
      type: NOTIFICATION_CHANGE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION_CHANGE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchNotificationGet() {
  yield takeEvery(NOTIFICATION_GET_REQUEST, notificationGet);
}

function* watchNotificationPatch() {
  yield takeEvery(NOTIFICATION_CHANGE_REQUEST, notificationPatch);
}

export default function* notificationSaga() {
  yield all([fork(watchNotificationGet), fork(watchNotificationPatch)]);
}
