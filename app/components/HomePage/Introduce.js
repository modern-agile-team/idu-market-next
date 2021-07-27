import React, { useState, useEffect, useRef } from "react";

const Introduce = ({}) => {
  const [scrollViewYoutube, setScrollViewYoutube] = useState(false);

  const handleScroll = () => {
    const pageScrollY = window.scrollY;

    if (pageScrollY >= 1900) {
      setTimeout(() => setScrollViewYoutube(true), 300);
    } else {
      setScrollViewYoutube(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home-introduce" className="home-introduce">
      <div className="bg-box"></div>
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
