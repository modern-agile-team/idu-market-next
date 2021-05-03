import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BOARD_DETAIL_REQUEST } from "../../../redux/types";
import BoardBanner from "../../../components/Board/BoardBanner";
import BoardDetailTop from "../../../components/Board/BoardDetailTop";

const BoardDetail = () => {
  const router = useRouter();
  const { categoryName, num } = router.query;

  const boardDetail = useSelector((state) => state.board);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: BOARD_DETAIL_REQUEST,
      payload: {
        categoryName: categoryName,
        num: num,
        studentId: auth.id,
      },
    });
  }, [dispatch, categoryName, num]);

  return (
    <>
      <BoardBanner title="Detail" desc={`${categoryName}`} />
      <section id="board-Detail" className="board-Detail">
        <div className="container">
          <BoardDetailTop
            boardDetail={boardDetail}
            categoryName={categoryName}
            num={num}
          />
          {boardDetail.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: boardDetail.content }}
            ></div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default BoardDetail;
