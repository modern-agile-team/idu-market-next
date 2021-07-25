import React from "react";
import Link from "next/link";
import { BsBookHalf } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { BsLaptop } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";

const Articles = ({ prevSectionOffset, nextSectionOffset }) => {
  const onWheel = (e) => {
    if (e.deltaY >= 100) {
      window.scrollTo({ top: nextSectionOffset });
    } else {
      window.scrollTo({ top: prevSectionOffset });
    }
  };

  return (
    <section onWheel={onWheel} id="home-articles" className="home-articles">
      <div className="container">
        <h1 className="article-title">ARTICLES</h1>
        <div className="article-box">
          <Link href="/boards/book">
            <div className="article-item-box box1">
              <p className="article-item-icon">
                <BsBookHalf />
              </p>

              <h2 className="article-item-title">Book</h2>
              <FaArrowCircleRight className="article-btn" />
            </div>
          </Link>

          <Link href="/boards/clothes">
            <div className="article-item-box box2">
              <p className="article-item-icon">
                <GiClothes />
              </p>
              <h2 className="article-item-title">Clothes</h2>
              <FaArrowCircleRight className="article-btn" />
            </div>
          </Link>

          <Link href="/boards/device">
            <div className="article-item-box box3">
              <p className="article-item-icon">
                <BsLaptop />
              </p>
              <h2 className="article-item-title">Device</h2>
              <FaArrowCircleRight className="article-btn" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Articles;
