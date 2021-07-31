import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";
import Head from "next/head";
import { API_KEY } from "../../Data/API_KEY";
import { useRouter } from "next/router";

const BoardFreePage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const perPage = useRef(10);
  const pageVisited = pageNumber * perPage.current;
  const pageCount = Math.ceil(boardList.length / perPage.current);
  const categoryName = "free";

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`, {
        headers: { "api-key": API_KEY },
      })
      .then((response) => {
        if (response.data.success) {
          const result = response.data.boards;
          setBoardList(result);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 400) {
          alert(response.data.msg);
        }
      });
  }, [categoryName, router.pathname]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Head>
        <title>IUAM | 자유 게시판</title>
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

export default BoardFreePage;
