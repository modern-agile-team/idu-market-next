import React from "react";
import Head from "next/head";
import { useGetBoardList } from "../../hooks/useGetBoardList";

import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";

const MarketDevicePage = () => {
  const categoryName = "device";
  const { productList } = useGetBoardList(categoryName);

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

export default MarketDevicePage;
