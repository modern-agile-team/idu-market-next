import React from "react";
import Image from "next/image";
// import banner from "../../static/images/banner.png";

const MainBanner = () => {
  const onScroll = (e) => {
    e.preventDefault();

    const articlesSection = document.querySelector("#home-articles");
    window.scrollTo({ top: articlesSection.offsetTop });
  };

  return (
    <section id="main-banner" className="main-banner">
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
        <img className="show" src="/images/banner.png" alt="배너 이미지" />
        <button onClick={onScroll}>START</button>
      </div>

      <div className="animation-scroll-box">
        <div className="circle"></div>
      </div>
    </section>
  );
};

export default MainBanner;
