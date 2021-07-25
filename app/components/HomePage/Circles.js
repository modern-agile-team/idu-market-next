import React from "react";

const Circles = () => {
  const onWheel = (e) => {
    const MainBannerOffsetTop =
      document.querySelector("#main-banner").offsetTop;
    const introduceOffsetTop =
      document.querySelector("#home-introduce").offsetTop;

    if (e.deltaY >= 100) {
      window.scrollTo({ top: introduceOffsetTop });
    } else {
      window.scrollTo({ top: MainBannerOffsetTop });
    }
  };

  return (
    <section id="home-circles">
      <div className="container">
        <div className="circles-desc-box"></div>
      </div>
    </section>
  );
};

export default Circles;
