import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";
import Head from "next/head";

const BoardNoticePage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 공지 게시판</title>
      </Head>
      <BoardBanner title="Boards" desc="notice" />
      <Basic categoryName="notice" />
    </>
  );
};

export default BoardNoticePage;
