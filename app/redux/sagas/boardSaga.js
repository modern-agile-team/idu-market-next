import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  BOARD_STATUS_REQUEST,
  BOARD_STATUS_SUCCESS,
  BOARD_STATUS_FAILURE,
  BOARD_DELETE_SUCCESS,
  BOARD_DELETE_REQUEST,
  BOARD_DELETE_FAILURE,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAILURE,
  BOARD_UPDATE_REQUEST,
  BOARD_UPDATE_SUCCESS,
  BOARD_UPDATE_FAILURE,
  BOARD_HIT_REQUEST,
  BOARD_HIT_SUCCESS,
  BOARD_HIT_FAILURE,
} from "../types";

//Board Detial
function boardDetailAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const studentId = payload.studentId;

  console.log(payload);
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${studentId}`
  );
}

function* boardDetail(action) {
  try {
    const result = yield call(boardDetailAPI, action.payload);
    console.log(result);
    yield put({
      type: BOARD_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_DETAIL_FAILURE,
      payload: e.response,
    });
  }
}

//BoardNew
function boardWriteAPI(payload) {
  const categoryName = payload.categoryName;

  console.log(payload);

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`,
    payload
  );
}

function* boardWrite(action) {
  try {
    const result = yield call(boardWriteAPI, action.payload);

    console.log(result);
    yield put({
      type: BOARD_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_WRITE_FAILURE,
      payload: e.response,
    });
  }
}

//Board Status
function boardStatusAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const body = {
    status: payload.status,
  };
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/status`,
    body
  );
}

function* boardStatus(action) {
  try {
    const result = yield call(boardStatusAPI, action.payload);

    yield put({
      type: BOARD_STATUS_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_STATUS_FAILURE,
      payload: e.response,
    });
  }
}

//Board Delete
function boardDeleteAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    payload
  );
}

function* boardDelete(action) {
  try {
    const result = yield call(boardDeleteAPI, action.payload);

    yield put({
      type: BOARD_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

//Image Delete
function imageDeleteAPI(payload) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, {
    data: {
      url: payload.url,
    },
  });
}

function* imageDelete(action) {
  try {
    const result = yield call(imageDeleteAPI, action.payload);

    yield put({
      type: IMAGE_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: IMAGE_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

//Board Update
function boardUpdateAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;

  console.log(payload);
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    payload
  );
}

function* boardUpdate(action) {
  try {
    const result = yield call(boardUpdateAPI, action.payload);

    console.log(result);
    yield put({
      type: BOARD_UPDATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: BOARD_UPDATE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchBoardWrite() {
  yield takeEvery(BOARD_WRITE_REQUEST, boardWrite);
}

function* watchBoardDetail() {
  yield takeEvery(BOARD_DETAIL_REQUEST, boardDetail);
}

function* watchBoardStatus() {
  yield takeEvery(BOARD_STATUS_REQUEST, boardStatus);
}

function* watchBoardDelete() {
  yield takeEvery(BOARD_DELETE_REQUEST, boardDelete);
}

function* watchImageDelete() {
  yield takeEvery(IMAGE_DELETE_REQUEST, imageDelete);
}

function* watchBoardUpdate() {
  yield takeEvery(BOARD_UPDATE_REQUEST, boardUpdate);
}

//boardSaga() 여러 Saga 통합
export default function* boardSaga() {
  yield all([
    fork(watchBoardWrite),
    fork(watchBoardDetail),
    fork(watchBoardStatus),
    fork(watchBoardDelete),
    fork(watchImageDelete),
    fork(watchBoardUpdate),
  ]);
}
