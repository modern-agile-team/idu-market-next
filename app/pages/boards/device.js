import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";

const Device = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BoardBanner title="Market" desc="device" />
      <section className="market" id="market">
        <button className="scroll-top-btn" onClick={scrollTop}>
          <AiOutlineArrowUp />
        </button>
        <BoardListTop categoryName="device" />
        <Market categoryName="device" />
      </section>
    </>
  );
};

export default Device;