import React, { useRef } from "react";
import Link from "next/link";

import BoardListItem from "./BoardListItem";
import BoardListTop from "./BoardListTop";
import Loading from "../Loading/Loading";

const Basic = ({
  categoryName,
  changePage,
  boardList,
  perPage,
  pageVisited,
  pageCount,
}) => {
  const displayBoardList = boardList
    .slice(pageVisited, pageVisited + perPage.current)
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
                  boardItem.isAdmin === 1
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
        {boardList.length > 0 ? <></> : <Loading />}
      </div>
    </section>
  );
};

export default Basic;
