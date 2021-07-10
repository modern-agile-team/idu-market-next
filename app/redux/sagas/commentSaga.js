import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
  COMMENT_GET_FAILURE,
  COMMENT_UPLOAD_REQUEST,
  COMMENT_UPLOAD_SUCCESS,
  COMMENT_UPLOAD_FAILURE,
  REPLY_UPLOAD_REQUEST,
  REPLY_UPLOAD_SUCCESS,
  REPLY_UPLOAD_FAILURE,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
} from "../types";

//Comment GET
function CommentGetAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const studentId = payload.studentId;

  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${studentId}`,
    {
      headers: {
        "api-key":
          "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
      },
    }
  );
}

function* commentGet(action) {
  try {
    const result = yield call(CommentGetAPI, action.payload);

    yield put({
      type: COMMENT_GET_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_GET_FAILURE,
      payload: e.response,
    });
  }
}

//Comment UPLOAD
function commentUploadAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const senderNickname = payload.senderNickname;
  const recipientNicknames = payload.recipientNicknames;
  const notiCategoryNum = payload.notiCategoryNum;
  const url = payload.url;

  const body = {
    studentId: payload.studentId,
    content: payload.content,
    senderNickname,
    recipientNicknames,
    notiCategoryNum,
    url,
  };
  const headers = {
    "api-key": "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}`,
    body,
    {
      headers: headers,
    }
  );
}

function* commentUpload(action) {
  try {
    const result = yield call(commentUploadAPI, action.payload);

    yield put({
      type: COMMENT_UPLOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_UPLOAD_FAILURE,
      payload: e.response,
    });
  }
}

//Comment UPDATE
function commentUpdateAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const commentNum = payload.commentNum;

  const body = {
    studentId: payload.studentId,
    content: payload.content,
  };

  const headers = {
    "api-key": "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
  };

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${commentNum}`,
    body,
    {
      headers: headers,
    }
  );
}

function* commentUpdate(action) {
  try {
    const result = yield call(commentUpdateAPI, action.payload);

    yield put({
      type: COMMENT_UPDATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_UPDATE_FAILURE,
      payload: e.response,
    });
  }
}

//Comment Delete
function commentDeleteAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const commentNum = payload.commentNum;

  const headers = {
    "api-key": "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
  };

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${commentNum}`,
    {
      data: {
        studentId: payload.studentId,
        depth: payload.depth,
      },
    },
    {
      headers: headers,
    }
  );
}

function* commentDelete(action) {
  try {
    const result = yield call(commentDeleteAPI, action.payload);
    yield put({
      type: COMMENT_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

//Reply Upload
function replyUploadAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const groupNum = payload.groupNum;
  const senderNickname = payload.senderNickname;
  const recipientNicknames = payload.recipientNicknames;
  const notiCategoryNum = payload.notiCategoryNum;
  const url = payload.url;

  const body = {
    studentId: payload.studentId,
    content: payload.content,
    senderNickname,
    recipientNicknames,
    notiCategoryNum,
    url,
  };

  const headers = {
    "api-key": "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
  };

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${groupNum}`,
    body,
    {
      headers: headers,
    }
  );
}

function* replyUpload(action) {
  try {
    const result = yield call(replyUploadAPI, action.payload);

    yield put({
      type: REPLY_UPLOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REPLY_UPLOAD_FAILURE,
      payload: e.response,
    });
  }
}

function* watchCommentGet() {
  yield takeEvery(COMMENT_GET_REQUEST, commentGet);
}

function* watchCommentUpload() {
  yield takeEvery(COMMENT_UPLOAD_REQUEST, commentUpload);
}

function* watchCommentUpdate() {
  yield takeEvery(COMMENT_UPDATE_REQUEST, commentUpdate);
}

function* watchCommentDelete() {
  yield takeEvery(COMMENT_DELETE_REQUEST, commentDelete);
}

function* watchReplyUpload() {
  yield takeEvery(REPLY_UPLOAD_REQUEST, replyUpload);
}

//authSaga() 여러 Saga 통합
export default function* commentSaga() {
  yield all([
    fork(watchCommentGet),
    fork(watchCommentUpload),
    fork(watchReplyUpload),
    fork(watchCommentUpdate),
    fork(watchCommentDelete),
  ]);
}
