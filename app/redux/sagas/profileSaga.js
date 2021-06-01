import axios from "axios";
import { all, fork, put, takeEvery, call, delay } from "redux-saga/effects";
import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAILURE,
  PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_FAILURE,
  LOGIN_CHECK_REQUEST,
} from "../types";

//Profile Get
function profileGetAPI(payload) {
  const studentId = payload;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`
  );
}

function* profileGet(action) {
  try {
    const result = yield call(profileGetAPI, action.payload);

    yield put({
      type: PROFILE_GET_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROFILE_GET_FAILURE,
      payload: e.response,
    });
  }
}

function profileImageUpdateAPI(payload) {
  const studentId = payload.studentId;
  const body = {
    profilePath: payload.profilePath,
  };

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`,
    body
  );
}

function* profileImageUpdate(action) {
  try {
    const result = yield call(profileImageUpdateAPI, action.payload);

    yield put({
      type: PROFILE_IMAGE_UPDATE_SUCCESS,
      payload: result.data,
    });

    yield delay(100);

    yield put({
      type: LOGIN_CHECK_REQUEST,
      payload: localStorage.getItem("jwt"),
    });
  } catch (e) {
    yield put({
      type: PROFILE_IMAGE_UPDATE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchProfileGet() {
  yield takeEvery(PROFILE_GET_REQUEST, profileGet);
}

function* watchProfileImageUpdate() {
  yield takeEvery(PROFILE_IMAGE_UPDATE_REQUEST, profileImageUpdate);
}

export default function* profileSaga() {
  yield all([fork(watchProfileGet), fork(watchProfileImageUpdate)]);
}
