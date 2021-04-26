import React from "react";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";

const Free = () => {
  return (
    <>
      <BoardBanner title="Boards" desc="freeboard" />
      <section id="boardlist-common" className="boardlist-common">
        <BoardListTop categoryName="free" />
        <div className="container">
          <Basic categoryName="free" />
        </div>
      </section>
    </>
  );
};

export default Free;
