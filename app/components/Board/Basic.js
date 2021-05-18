import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import BoardListItem from "./BoardListItem";

const Basic = ({ categoryName }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const perPage = 10;
  const pageVisited = pageNumber * perPage;
  const pageCount = Math.ceil(boardList.length / perPage);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`)
      .then((response) => {
        if (response.data.success) {
          const result = response.data.boards;
          console.log(response.data);
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

  const displayBoardList = boardList
    .slice(pageVisited, pageVisited + perPage)
    .map((boardItem) => {
      return (
        <tr key={boardItem.num}>
          <td>{boardItem.num}</td>
          <td className="boardlist-common-title">
            <Link href={`/boards/${categoryName}/${boardItem.num}`}>
              <a>{boardItem.title}</a>
            </Link>
          </td>
          <td>
            <Link href={`/students/${boardItem.studentId}`}>
              <a className="boardlist-common-nickname">{boardItem.nickname}</a>
            </Link>
          </td>
          <td className="boardlist-common-td">
            {boardItem.inDate.substring(0, 10)}
          </td>
          <td>{boardItem.hit}</td>
        </tr>
      );
    });

  return (
    <BoardListItem
      displayBoardList={displayBoardList}
      pageCount={pageCount}
      changePage={changePage}
    />
  );
};

export default Basic;
