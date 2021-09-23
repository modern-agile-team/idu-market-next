import React from "react";
import Head from "next/head";

import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";
import { useGetMarketList } from "../../hooks/useGetMarketList";

const MarketBookPage = () => {
  const categoryName = "book";
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

export default MarketBookPage;
