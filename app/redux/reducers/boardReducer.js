import {
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
} from "../types";

const initialState = {
  data: [],
  loading: false,
  num: "",
  studentName: "",
  studentId: "",
  title: "",
  content: "",
  hit: "",
  price: "",
  status: "",
  inDate: "",
  updateDate: "",
  isLoading: false,
  msg: "",
  isWatchList: null,
  categoryName: "",
  profilePath: "",
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case BOARD_DETAIL_REQUEST:
    case BOARD_WRITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
        num: "",
      };
    case BOARD_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.msg,
        num: action.payload.num,
      };
    case BOARD_WRITE_FAILURE:
      return {
        ...state,
        data: [],
        msg: action.payload.data.msg,
      };
    case BOARD_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        num: action.payload.board.num,
        studentName: action.payload.board.studentName,
        nickname: action.payload.board.nickname,
        studentId: action.payload.board.studentId,
        title: action.payload.board.title,
        content: action.payload.board.content,
        status: action.payload.board.status,
        hit: action.payload.board.hit,
        price: action.payload.board.price,
        inDate: action.payload.board.inDate,
        updateDate: action.payload.board.updateDate,
        msg: action.payload.msg,
        isWatchList: action.payload.isWatchList,
        categoryName: action.payload.board.categoryName,
        profilePath: action.payload.board.profilePath,
      };
    case BOARD_DETAIL_FAILURE:
      return {
        ...state,
        num: "",
        studentName: "",
        title: "",
        content: "",
        status: "",
        hit: "",
        price: "",
        inDate: "",
        updateDate: "",
        isLoading: false,
        profilePath: "",
        isWatchList: "",
        msg: "",
      };
    default:
      return state;
  }
};

export default board;
