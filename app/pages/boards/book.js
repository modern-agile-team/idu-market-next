import React from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowUp } from "react-icons/ai";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";

const Book = () => {
  const router = useRouter();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BoardBanner title="Market" desc="book" />
      <section className="market" id="market">
        <button className="scroll-top-btn" onClick={scrollTop}>
          <AiOutlineArrowUp />
        </button>
        <BoardListTop categoryName="book" />
        <Market categoryName="book" />
      </section>
    </>
  );
};

export default Book;
