import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { API_KEY } from "../../Data/API_KEY";
import {
  LOGIN_CHECK_FAILURE,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from "../types";

// Loading
function loginCheckAPI(token) {
  const config = {
    headers: {
      "api-key": API_KEY,
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
    return axios.get(`/api/auth`, config).catch((e) => {
      localStorage.removeItem("jwt");
    });
  } else {
    return axios.get(`/api/un-auth`, config);
  }
}

function* loginCheck(action) {
  const result = yield call(loginCheckAPI, action.payload);

  try {
    yield put({
      type: LOGIN_CHECK_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_CHECK_FAILURE,
      payload: e.response,
    });
  }
}

// LOGOUT
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchLoginCheck() {
  yield takeEvery(LOGIN_CHECK_REQUEST, loginCheck);
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

//authSaga() 여러 Saga 통합
export default function* authSaga() {
  yield all([fork(watchLoginCheck), fork(watchLogout)]);
}
