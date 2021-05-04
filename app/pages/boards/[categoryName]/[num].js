import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BOARD_DETAIL_REQUEST,
  COMMENT_GET_REQUEST,
} from "../../../redux/types";
import BoardBanner from "../../../components/Board/BoardBanner";
import BoardDetailTop from "../../../components/Board/BoardDetailTop";
import BoardDetailImage from "../../../components/Board/BoardDetailImage";
import BoardDetailContent from "../../../components/Board/BoardDetailContent";
import Comment from "../../../components/Comment/Comment";
import Head from "next/head";

const BoardDetail = () => {
  const router = useRouter();
  const { categoryName, num } = router.query;

  const boardDetail = useSelector((state) => state.board);
  const { comments } = useSelector((state) => state.comment);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id.length === 0) {
      dispatch({
        type: BOARD_DETAIL_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: "not-login",
        },
      });
      dispatch({
        type: COMMENT_GET_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: "not-login",
        },
      });
    } else {
      dispatch({
        type: BOARD_DETAIL_REQUEST,
        payload: {
          categoryName: categoryName,
          num: num,
          studentId: auth.id,
        },
      });
      dispatch({
        type: COMMENT_GET_REQUEST,
        payload: {
          categoryName,
          num,
          studentId: auth.id,
        },
      });
    }
  }, [dispatch, categoryName, num]);

  return (
    <>
      <Head>
        <title>IUAM | 게시판</title>
      </Head>
      <BoardBanner title="Detail" desc={`${categoryName}`} />
      <section id="board-Detail" className="board-Detail">
        <div className="container">
          <BoardDetailTop
            boardDetail={boardDetail}
            categoryName={categoryName}
            num={num}
          />
          {categoryName === "free" || categoryName === "notice" ? (
            <></>
          ) : (
            <BoardDetailImage boardDetail={boardDetail} />
          )}
          <BoardDetailContent boardDetail={boardDetail} />
          <Comment comments={comments} categoryName={categoryName} num={num} />
        </div>
      </section>
    </>
  );
};

export default BoardDetail;
