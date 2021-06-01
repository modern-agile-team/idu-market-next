import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";
import Head from "next/head";

const BoardFreePage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 자유 게시판</title>
      </Head>
      <BoardBanner title="Boards" desc="free" />
      <Basic categoryName="free" />
    </>
  );
};

export default BoardFreePage;
