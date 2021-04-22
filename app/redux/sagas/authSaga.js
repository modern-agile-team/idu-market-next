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
  return axios.post(`${process.env.API_URL}/api/jwt`, loginData);
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

  console.log(process.env.NEXT_PUBLIC_API_URL);

  if (token) {
    config.headers["x-auth-token"] = token;
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, config)
      .catch((e) => {
        localStorage.removeItem("jwt");
      });
  } else {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/un-auth`, config);
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
