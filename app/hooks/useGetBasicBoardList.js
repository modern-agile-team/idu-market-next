import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useGetBasicBoardList = (categoryName) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const perPage = useRef(10);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/boards/${categoryName}`)
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

  const pageVisited = useMemo(() => {
    return pageNumber * perPage.current;
  }, [pageNumber, perPage.current]);

  const pageCount = useMemo(() => {
    return Math.ceil(boardList.length / perPage.current);
  }, [boardList, perPage.current]);

  return {
    boardList,
    perPage,
    pageVisited,
    pageCount,
    changePage,
  };
};
