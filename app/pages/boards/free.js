import React from "react";
import { useRouter } from "next/router";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";
import Basic from "../../components/Board/Basic";

const Free = () => {
  const router = useRouter();

  return (
    <>
      <BoardBanner title="Boards" desc="freeboard" />
      <section id="boardlist-common" className="boardlist-common">
        <BoardListTop />
        <div className="container">
          <Basic categoryName="free" />
        </div>
      </section>
    </>
  );
};

export default Free;
