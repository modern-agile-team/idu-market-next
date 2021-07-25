import React, { useState, useEffect } from "react";

const Introduce = () => {
  const [scrollViewYoutube, setScrollViewYoutube] = useState(false);
  const [scrollViewIntro, setScrollViewIntro] = useState(false);

  const handleScroll = () => {
    const pageScrollY = window.scrollY;

    if (pageScrollY >= 1300) {
      setScrollViewIntro(true);
      setTimeout(() => setScrollViewYoutube(true), 300);
    } else {
      setScrollViewYoutube(false);
      setScrollViewIntro(false);
    }
  };

  const onWheel = (e) => {
    const functionOffsetTop =
      document.querySelector("#home-function").offsetTop;
    const noticeOffsetTop = document.querySelector("#home-notice").offsetTop;

    if (e.deltaY >= 100) {
      window.scrollTo({ top: noticeOffsetTop });
    } else {
      window.scrollTo({ top: functionOffsetTop });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section onWheel={onWheel} id="home-introduce" className="home-introduce">
      <div className="container">
        <div className="intro-desc-box">
          <h5>Idu Market</h5>
          <h2>아이두 마켓 소개 영상</h2>
        </div>
        <div className={scrollViewYoutube ? "youtube-box show" : "youtube-box"}>
          <iframe
            className="intro-youtube"
            title="iuam intro youtube"
            src="https://www.youtube.com/embed/f6bLhqHekY8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Introduce;
