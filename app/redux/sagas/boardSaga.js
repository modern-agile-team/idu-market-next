import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { API_KEY } from "../../Data/API_KEY";
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
  WATCHLIST_ADD_REQUEST,
  WATCHLIST_ADD_SUCCESS,
  WATCHLIST_ADD_FAILURE,
  WATCHLIST_DELETE_REQUEST,
  WATCHLIST_DELETE_SUCCESS,
  WATCHLIST_DELETE_FAILURE,
} from "../types";

//Board Detial
function boardDetailAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const studentId = payload.studentId;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${studentId}`,
    {
      headers: {
        "api-key": API_KEY,
      },
    }
  );
}

function* boardDetail(action) {
  try {
    const result = yield call(boardDetailAPI, action.payload);

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
  const headers = {
    "api-key": API_KEY,
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`,
    payload,
    { headers }
  );
}

function* boardWrite(action) {
  try {
    const result = yield call(boardWriteAPI, action.payload);

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
  const headers = {
    "api-key": API_KEY,
  };

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/status`,
    body,
    { headers }
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

  const headers = {
    "api-key": API_KEY,
  };

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    { headers }
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
  const fileId = payload.fileId;
  const fileIds = fileId.join();
  const headers = {
    "api-key": API_KEY,
    Authorization: process.env.NEXT_PUBLIC_IMAGE_SECRET_KEY,
  };

  return axios.delete(
    `https://api-image.cloud.toast.com/image/v2.0/appkeys/${process.env.NEXT_PUBLIC_IMAGE_KEY}/images/async?fileIds=${fileIds}`,
    {
      headers,
    }
  );
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

  const headers = {
    "api-key": API_KEY,
  };

  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    payload,
    { headers }
  );
}

function* boardUpdate(action) {
  try {
    const result = yield call(boardUpdateAPI, action.payload);

    yield put({
      type: BOARD_UPDATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_UPDATE_FAILURE,
      payload: e.response,
    });
  }
}

//Board Hit
function boardHitAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;

  const headers = {
    "api-key": API_KEY,
  };

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    {},
    { headers }
  );
}

function* boardHit(action) {
  try {
    const result = yield call(boardHitAPI, action.payload);

    yield put({
      type: BOARD_HIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_HIT_FAILURE,
      payload: e.response,
    });
  }
}

//Board watchlist Add
function WatchlistAddAPI(payload) {
  const studentId = payload.studentId;

  const body = {
    boardNum: payload.boardNum,
    categoryName: payload.categoryName,
  };
  const headers = {
    "api-key": API_KEY,
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${studentId}`,
    body,
    { headers }
  );
}

function* WatchlistAdd(action) {
  try {
    const result = yield call(WatchlistAddAPI, action.payload);

    yield put({
      type: WATCHLIST_ADD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: WATCHLIST_ADD_FAILURE,
      payload: e.response,
    });
  }
}

//Board Delete
function WatchlistDeleteAPI(payload) {
  const studentId = payload.studentId;

  const headers = {
    "api-key": API_KEY,
  };

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${studentId}`,
    {
      data: {
        boardNum: payload.boardNum,
      },
      headers,
    }
  );
}

function* WatchlistDelete(action) {
  try {
    const result = yield call(WatchlistDeleteAPI, action.payload);

    yield put({
      type: WATCHLIST_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: WATCHLIST_DELETE_FAILURE,
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

function* watchBoardHit() {
  yield takeEvery(BOARD_HIT_REQUEST, boardHit);
}

function* watchWatchlistAdd() {
  yield takeEvery(WATCHLIST_ADD_REQUEST, WatchlistAdd);
}

function* watchWatchlistDelete() {
  yield takeEvery(WATCHLIST_DELETE_REQUEST, WatchlistDelete);
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
    fork(watchBoardHit),
    fork(watchWatchlistAdd),
    fork(watchWatchlistDelete),
  ]);
}
