import React, { useState, useRef, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Notice = ({ slides, getOffsetTop }) => {
  const SLIDES_LENGTH = slides.length;

  const [currentImage, setCurrentImage] = useState(0);
  const ref = useRef();

  const nextSlide = () => {
    setCurrentImage(currentImage === SLIDES_LENGTH - 1 ? 0 : currentImage + 1);
  };

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? SLIDES_LENGTH - 1 : currentImage - 1);
  };

  if (!Array.isArray(slides) || SLIDES_LENGTH <= 0) return null;

  const onWheel = (e) => {
    const articlesOffsetTop =
      document.querySelector("#home-articles").offsetTop;
    const introduceOffsetTop =
      document.querySelector("#home-introduce").offsetTop;

    if (e.deltaY >= 100) {
      window.scrollTo({ top: articlesOffsetTop });
    } else {
      window.scrollTo({ top: introduceOffsetTop });
    }
  };

  useEffect(() => {
    getOffsetTop(ref.current.offsetTop);
  }, []);

  return (
    <section
      ref={ref}
      onWheel={onWheel}
      id="home-notice"
      className="home-notice"
    >
      {/* <div className="notice-box">
        <h1 className="notice-title">NOTICE</h1>
      </div> */}

      <BsChevronCompactLeft className="left-arrow" onClick={prevSlide} />
      <BsChevronCompactRight className="right-arrow" onClick={nextSlide} />

      {slides.map((slide, index) => {
        return (
          <div
            className={
              index === currentImage ? "notice-slide active" : "notice-slide"
            }
            key={index}
          >
            {index === currentImage && (
              <img src={slide.image} alt={slide.alt} className="notice-image" />
            )}
          </div>
        );
      })}

      <div className="slide-btns">
        <div
          className={currentImage === 0 ? "slide-btn active" : "slide-btn"}
          onClick={() => setCurrentImage(0)}
        />
        <div
          className={currentImage === 1 ? "slide-btn active" : "slide-btn"}
          onClick={() => setCurrentImage(1)}
        />
      </div>
    </section>
  );
};

export default Notice;
