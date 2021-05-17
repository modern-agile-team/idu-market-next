import React from "react";
import BoardListTop from "../../components/Board/BoardListTop";
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
      <section id="boardlist-common" className="boardlist-common">
        <BoardListTop categoryName="free" />
        <div className="container">
          <Basic categoryName="free" />
        </div>
      </section>
    </>
  );
};

export default BoardFreePage;
