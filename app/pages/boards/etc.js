import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";
import Head from "next/head";

const EtcPage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 거래 장터</title>
      </Head>
      <BoardBanner title="Market" desc="etc" />
      <Market categoryName="etc" />
    </>
  );
};

export default EtcPage;
