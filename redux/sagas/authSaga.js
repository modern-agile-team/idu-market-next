import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";

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

    // yield put({
    //   type: LOADING_REQUEST,
    //   payload: localStorage.getItem("jwt"),
    // });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

//authSaga() 여러 Saga 통합
export default function* authSaga() {
  yield all([fork(watchLoginUser)]);
}
