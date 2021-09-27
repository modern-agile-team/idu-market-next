import React from "react";
import Head from "next/head";
import { useGetMarketList } from "../../hooks/useGetMarketList";
import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";

const MarketFreePage = () => {
  const categoryName = "freemarket";
  const { productList } = useGetMarketList(categoryName);

  return (
    <>
      <Head>
        <title>IUAM | 거래 장터</title>
      </Head>
      <BoardBanner title="Market" desc={categoryName} />
      <Market categoryName={categoryName} productList={productList} />
    </>
  );
};

export default MarketFreePage;
