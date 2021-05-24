import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  NOTIFICATION_GET_REQUEST,
  NOTIFICATION_GET_SUCCESS,
  NOTIFICATION_GET_FAILURE,
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_CHANGE_SUCCESS,
  NOTIFICATION_CHANGE_FAILURE,
} from "../types";

//Notification POST
function notificationPostAPI(payload) {
  const notiCategoryNum = payload.notiCategoryNum;
  const senderNickname = payload.senderNickname;
  const recipientNickname = payload.recipientNickname;
  const url = payload.url;
  const boardNum = payload.num;

  const body = {
    notiCategoryNum,
    senderNickname,
    recipientNickname,
    url,
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${boardNum}`,
    body
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

//Notification GET
function notificationGetAPI(payload) {
  const studentId = payload.studentId;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${studentId}`
  );
}

function* notificationGet(action) {
  try {
    const result = yield call(notificationGetAPI, action.payload);

    console.log(result);

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

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${studentId}`,
    body
  );
}

function* notificationPatch(action) {
  try {
    const result = yield call(notificationPatchAPI, action.payload);

    console.log(result);

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

function* watchNotificationPost() {
  yield takeEvery(NOTIFICATION_REQUEST, notificationPost);
}

function* watchNotificationGet() {
  yield takeEvery(NOTIFICATION_GET_REQUEST, notificationGet);
}

function* watchNotificationPatch() {
  yield takeEvery(NOTIFICATION_CHANGE_REQUEST, notificationPatch);
}

export default function* notificationSaga() {
  yield all([
    fork(watchNotificationPost),
    fork(watchNotificationGet),
    fork(watchNotificationPatch),
  ]);
}
