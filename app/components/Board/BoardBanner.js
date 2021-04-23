import React from "react";

const BoardBanner = ({ title, desc }) => {
  return (
    <section className="board-banner" id="board-banner">
      <div className="container">
        <div className="board-banner-circle">
          <h1 className="board-banner-title">{title}</h1>
          <p className="board-banner-desc">{desc}</p>
        </div>
      </div>
    </section>
  );
};

export default BoardBanner;
