import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
} from "../types";

//Profile Get
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

  console.log(body);

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${boardNum}`,
    body
  );
}

function* notificationPost(action) {
  try {
    const result = yield call(notificationPostAPI, action.payload);

    console.log(result);

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
