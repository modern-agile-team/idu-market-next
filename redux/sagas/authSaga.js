import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOADING_FAILURE,
  LOADING_SUCCESS,
  LOADING_REQUEST,
} from "../types";

// LOGIN
function loginUserAPI(loginData) {
  return axios.post("http://13.125.55.135:9800/api/jwt", loginData);
}

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });

    yield put({
      type: LOADING_REQUEST,
      payload: localStorage.getItem("jwt"),
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

// Loading
function loginCheckAPI(token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
    return axios
      .get("http://13.125.55.135:9800/api/auth", config)
      .catch((e) => {
        localStorage.removeItem("jwt");
      });
  } else {
    return axios.get("http://13.125.55.135:9800/api/un-auth", config);
  }
}

//LOADING
function* loginCheck(action) {
  const result = yield call(loginCheckAPI, action.payload);

  console.log(result);

  try {
    yield put({
      type: LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchLoginCheck() {
  yield takeEvery(LOADING_REQUEST, loginCheck);
}

//authSaga() 여러 Saga 통합
export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLoginCheck)]);
}
