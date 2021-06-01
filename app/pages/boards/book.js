import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";
import Head from "next/head";

const MarketBookPage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 거래 장터</title>
      </Head>
      <BoardBanner title="Market" desc="book" />
      <Market categoryName="book" />
    </>
  );
};

export default MarketBookPage;
