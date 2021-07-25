import React from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";

const MainBanner = ({ nextSectionOffset }) => {
  const onScroll = (e) => {
    e.preventDefault();

    const articlesSection = document.querySelector("#home-articles");
    window.scrollTo({ top: articlesSection.offsetTop });
  };

  const onWheel = (e) => {
    if (e.deltaY >= 100) {
      window.scrollTo({ top: nextSectionOffset });
    }
  };

  return (
    <section onWheel={onWheel} id="main-banner" className="main-banner">
      <div className="banner-title">
        <h1>
          <span>Idu</span> Used Article Marke<em>t</em>
        </h1>
        <p className="show">by. Wooahan Agile</p>
      </div>

      <button className="banner-start-btn" onClick={onScroll}>
        START
      </button>

      <div className="banner-img">
        <img
          className="show"
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/main-banner.png"
          alt="배너 이미지"
        />
        <button onClick={onScroll}>START</button>
      </div>

      <div className="animation-scroll-box">
        <div className="circle"></div>
      </div>
    </section>
  );
};

export default MainBanner;
