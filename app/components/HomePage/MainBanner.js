import React from "react";

const MainBanner = () => {
  const onScroll = (e) => {
    e.preventDefault();

    const introduceSection = document.querySelector("#home-introduce");

    window.scrollTo({ top: introduceSection.offsetTop - 70 });
  };

  return (
    <section id="main-banner" className="main-banner">
      <div className="banner-title">
        <h1>
          <span>Idu</span> Used Article Marke<em>t</em>
        </h1>
        <p className="show">by. Wooahan Agile</p>
      </div>

      <a className="banner-start-btn" onClick={onScroll}>
        START
      </a>

      <div className="banner-img">
        <img
          className="show"
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/main-banner.png"
          alt="배너 이미지"
        />
        <a onClick={onScroll}>START</a>
      </div>
    </section>
  );
};

export default MainBanner;
