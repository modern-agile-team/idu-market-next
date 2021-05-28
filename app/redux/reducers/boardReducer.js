import {
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  BOARD_STATUS_REQUEST,
  BOARD_STATUS_SUCCESS,
  BOARD_STATUS_FAILURE,
  BOARD_DELETE_REQUEST,
  BOARD_DELETE_SUCCESS,
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
  TRADE_COMPLETE_REQUEST,
  TRADE_COMPLETE_SUCCESS,
  TRADE_COMPLETE_FAILURE,
} from "../types";

const initialState = {
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
  images: [],
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case TRADE_COMPLETE_REQUEST:
    case WATCHLIST_DELETE_REQUEST:
    case WATCHLIST_ADD_REQUEST:
    case BOARD_HIT_REQUEST:
    case BOARD_UPDATE_REQUEST:
    case IMAGE_DELETE_REQUEST:
    case BOARD_DELETE_REQUEST:
    case BOARD_STATUS_REQUEST:
    case BOARD_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        msg: "",
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
        images: action.payload.images,
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
        images: [],
      };

    case BOARD_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        status: action.payload.status,
      };

    case BOARD_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
        status: "",
      };

    case BOARD_UPDATE_SUCCESS:
    case IMAGE_DELETE_SUCCESS:
    case BOARD_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };

    case BOARD_HIT_FAILURE:
    case BOARD_UPDATE_FAILURE:
    case IMAGE_DELETE_FAILURE:
    case BOARD_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
      };

    case BOARD_HIT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        hit: action.payload.hit,
      };

    case WATCHLIST_ADD_SUCCESS:
      return {
        ...state,
        loading: true,
        isWatchList: 1,
        msg: action.payload.msg,
      };

    case WATCHLIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: true,
        isWatchList: 0,
        msg: action.payload.msg,
      };

    case WATCHLIST_DELETE_FAILURE:
    case WATCHLIST_ADD_FAILURE:
      return {
        ...state,
        loading: true,
        isWatchList: null,
        msg: action.payload.data.msg,
      };

    case TRADE_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        status: 3,
      };

    case TRADE_COMPLETE_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload.data.msg,
      };

    default:
      return state;
  }
};

export default board;
