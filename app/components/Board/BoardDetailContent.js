import React from "react";

const BoardDetailContent = ({ boardDetail }) => {
  return (
    <>
      {boardDetail.content ? (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: boardDetail.content }}
            className="board-detail-content"
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BoardDetailContent;
