import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { TRADE_COMMENT_GET_REQUEST } from "../../../../../redux/types";
import TradeComplete from "../../../../../components/Trade/TradeComplete";
import BoardBanner from "../../../../../components/Board/BoardBanner";

const TradeCompletePage = () => {
  const router = useRouter();
  const { categoryName, num, studentId } = router.query;

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const buyers = useSelector((state) => state.trade.buyers);
  const { status, nickname } = useSelector((state) => state.board);

  useEffect(() => {
    const body = {
      categoryName,
      num,
    };

    if (
      categoryName === "book" ||
      categoryName === "device" ||
      categoryName === "clothes" ||
      categoryName === "freemarket" ||
      categoryName === "etc"
    ) {
      if (status === 0 || status === 1) {
        alert("거래 완료 상태가 아닙니다.");
        router.back();
      }

      if (id !== studentId) {
        alert("잘못된 접근입니다.");
        router.back();
      } else {
        dispatch({
          type: TRADE_COMMENT_GET_REQUEST,
          payload: body,
        });
      }
    } else {
      alert("잘못된 접근입니다.");
      router.back();
    }
  }, []);
  return (
    <>
      <Head>
        <title>IUAM | 거래 완료</title>
      </Head>
      <BoardBanner title="Market" desc="complete" />
      <section className="trade-complete" id="trade-complete">
        <div className="container">
          <TradeComplete
            buyers={buyers}
            nickname={nickname}
            categoryName={categoryName}
            num={num}
          />
        </div>
      </section>
    </>
  );
};

export default TradeCompletePage;
