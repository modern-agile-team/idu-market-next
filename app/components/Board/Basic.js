import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import BoardListItem from "./BoardListItem";
import BoardListTop from "./BoardListTop";

const Basic = ({ categoryName }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const { isAdmin } = useSelector((state) => state.auth);

  const perPage = 10;
  const pageVisited = pageNumber * perPage;
  const pageCount = Math.ceil(boardList.length / perPage);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`)
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
              <a
                className={
                  boardItem.nickname.length > 6
                    ? "boardlist-common-nickname admin"
                    : "boardlist-common-nickname"
                }
              >
                {boardItem.nickname}
              </a>
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
    <section id="boardlist-common" className="boardlist-common">
      <BoardListTop categoryName={categoryName} />
      <div className="container">
        <BoardListItem
          displayBoardList={displayBoardList}
          pageCount={pageCount}
          changePage={changePage}
        />
        {boardList.length > 0 ? (
          <></>
        ) : (
          <h1 className="empty-list-desc">게시물 목록이 비어있습니다.</h1>
        )}
      </div>
    </section>
  );
};

export default Basic;
