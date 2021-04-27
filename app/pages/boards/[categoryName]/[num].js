import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BOARD_DETAIL_REQUEST } from "../../../redux/types";
import BoardBanner from "../../../components/Board/BoardBanner";

const BoardDetail = () => {
  const router = useRouter();
  const { categoryName, num } = router.query;

  const { content } = useSelector((state) => state.board);
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
  }, [dispatch, categoryName, num, auth.id]);

  return (
    <>
      <BoardBanner title="Detail" desc={`${categoryName}`} />
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BoardDetail;
