import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
          setBoardList(response.data.boards);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 400) {
          alert(response.data.msg);
        }
      });
  }, []);

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
    <>
      <table className="boardlist-common-tables">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody id="boardlist-common-body">{displayBoardList}</tbody>
      </table>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination-container"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"disabled"}
          activeLinkClassName={"active"}
        />
      </div>
    </>
  );
};

export default Basic;
