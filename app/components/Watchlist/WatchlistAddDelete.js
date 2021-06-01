import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  WATCHLIST_ADD_REQUEST,
  WATCHLIST_DELETE_REQUEST,
} from "../../redux/types";

const WatchlistAddDelete = ({
  isWatchList,
  categoryName,
  boardNum,
  studentId,
}) => {
  const dispatch = useDispatch();

  const onDeleteWatchlist = () => {
    const confirmWatchlist = window.confirm("관심목록에서 제거하시겠습니까?");
    const body = {
      boardNum,
      studentId,
    };
    if (confirmWatchlist) {
      dispatch({
        type: WATCHLIST_DELETE_REQUEST,
        payload: body,
      });
    }
  };

  const onSubmitWatchlist = () => {
    const confirmWatchlist = window.confirm("관심목록에 추가하시겠습니까?");
    const body = {
      boardNum,
      categoryName,
      studentId,
    };
    if (confirmWatchlist) {
      dispatch({
        type: WATCHLIST_ADD_REQUEST,
        payload: body,
      });
    }
  };

  return (
    <div
      className={isWatchList ? "watchlist-delete-box" : "watchlist-add-box"}
      onClick={isWatchList ? onDeleteWatchlist : onSubmitWatchlist}
    >
      <AiFillHeart
        className={isWatchList ? "watchlist-btn-delete" : "watchlist-btn-add"}
      />
    </div>
  );
};

export default WatchlistAddDelete;
