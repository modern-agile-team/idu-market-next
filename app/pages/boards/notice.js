import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";
import Head from "next/head";

const BoardNoticePage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const perPage = useRef(10);
  const pageVisited = pageNumber * perPage.current;
  const pageCount = Math.ceil(boardList.length / perPage.current);
  const categoryName = "notice";

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`, {
        headers: {
          "api-key":
            "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
        },
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
  }, [categoryName]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
