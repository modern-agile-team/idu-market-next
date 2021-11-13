import React from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";
import Head from "next/head";
import { useGetBasicBoardList } from "../../hooks/useGetBasicBoardList";

const categoryName = "notice";

const BoardNoticePage = () => {
  const { boardList, perPage, pageVisited, pageCount, changePage } =
    useGetBasicBoardList(categoryName);

  return (
    <>
      <Head>
        <title>IUAM | 공지 게시판</title>
      </Head>
      <BoardBanner title="Boards" desc={categoryName} />
      <Basic
        categoryName={categoryName}
        changePage={changePage}
        boardList={boardList}
        perPage={perPage}
        pageVisited={pageVisited}
        pageCount={pageCount}
      />
    </>
  );
};

export default BoardNoticePage;
