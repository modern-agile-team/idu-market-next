import React from "react";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";

const Notice = () => {
  return (
    <>
      <BoardBanner title="Boards" desc="notice" />
      <section id="boardlist-common" className="boardlist-common">
        <BoardListTop categoryName="notice" />
        <div className="container">
          <Basic categoryName="notice" />
        </div>
      </section>
    </>
  );
};

export default Notice;
