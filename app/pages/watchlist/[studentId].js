import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import BoardBanner from "../../components/Board/BoardBanner";
import MarketListItem from "../../components/Board/MarketListItem";
import { useGetProfileBoardList } from "../../hooks/useGetProfileBoardList";

const URL = "/api/watchlist";
const LIST_TYPE = "watch";

const WatchlistPage = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const { productList } = useGetProfileBoardList(studentId, URL, LIST_TYPE);

  return (
    <>
      <Head>
        <title>IUAM | 관심 목록</title>
      </Head>
      <BoardBanner title="Profile" desc="watchlist" />
      <section className="market" id="market">
        <Link href={`/students/${studentId}`}>
          <a className="profile-move-btn">Profile</a>
        </Link>
        <h1 className="watchlist-title">
          {`관심 목록 (${productList.length})`}
        </h1>
        <div className="container">
          {productList.length > 0 ? (
            <MarketListItem productList={productList} profile />
          ) : (
            <h1 className="empty-list-desc">관심목록이 비어있습니다.</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default WatchlistPage;
