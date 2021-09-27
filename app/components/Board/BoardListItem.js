import React from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BoardListItem = ({ displayBoardList, pageCount, changePage }) => {
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

      {displayBoardList.length > 0 && (
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
      )}
    </>
  );
};

export default BoardListItem;
