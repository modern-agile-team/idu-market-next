import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Head from "next/head";
import WatchlistComponent from "../../components/Watchlist/WatchlistComponent";

const Watchlist = () => {
  return (
    <>
      <Head>
        <title>IUAM | 관심 목록</title>
      </Head>
      <BoardBanner title="Profile" desc="watchlist" />
      <section className="market" id="market">
        <div className="container">
          <WatchlistComponent />
        </div>
      </section>
    </>
  );
};

export default Watchlist;
