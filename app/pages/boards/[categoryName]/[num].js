import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BOARD_DETAIL_REQUEST,
  BOARD_HIT_REQUEST,
  COMMENT_GET_REQUEST,
} from "../../../redux/types";
import Head from "next/head";

import BoardBanner from "../../../components/Board/BoardBanner";
import BoardDetailTop from "../../../components/Board/BoardDetailTop";
import BoardDetailImage from "../../../components/Board/BoardDetailImage";
import BoardDetailContent from "../../../components/Board/BoardDetailContent";
import Comment from "../../../components/Comment/Comment";

const BoardDetailPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const router = useRouter();
  const { categoryName, num } = router.query;

  const boardDetail = useSelector((state) => state.board);
  const { comments } = useSelector((state) => state.comment);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const SLIDES_LENGTH = boardDetail.images.length;

  useEffect(() => {
    if (categoryName && num) {
      if (!id) {
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
            studentId: id,
            fileId: boardDetail.fileId,
          },
        });
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: {
            categoryName,
            num,
            studentId: id,
          },
        });
        dispatch({
          type: BOARD_HIT_REQUEST,
          payload: {
            categoryName,
            num,
          },
        });
      }
    }
  }, [dispatch, router.pathname, categoryName, num]);

  const nextSlide = () => {
    setCurrentImage(currentImage === SLIDES_LENGTH - 1 ? 0 : currentImage + 1);
  };

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? SLIDES_LENGTH - 1 : currentImage - 1);
  };

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
          <BoardDetailImage
            boardDetail={boardDetail}
            currentImage={currentImage}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
          <BoardDetailContent boardDetail={boardDetail} />
          <Comment comments={comments} categoryName={categoryName} num={num} />
        </div>
      </section>
    </>
  );
};

export default BoardDetailPage;
