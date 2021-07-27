import React, { useState, useRef, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

const Notice = ({ slides }) => {
  const SLIDES_LENGTH = slides.length;

  // const [currentImage, setCurrentImage] = useState(0);

  // const nextSlide = () => {
  //   setCurrentImage(currentImage === SLIDES_LENGTH - 1 ? 0 : currentImage + 1);
  // };

  // const prevSlide = () => {
  //   setCurrentImage(currentImage === 0 ? SLIDES_LENGTH - 1 : currentImage - 1);
  // };

  // if (!Array.isArray(slides) || SLIDES_LENGTH <= 0) return null;

  return (
    <section id="home-notice" className="home-notice">
      {/* <BsChevronCompactLeft className="left-arrow" onClick={prevSlide} />
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
      </div> */}
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={40}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="slide-container">
            <div className="slide-notice-container">
              <h1>Notice 01</h1>
              <p className="slide-notice-paragraph">
                아이두 마켓에 방문해 주신 인덕대 학생 여러분 <br />
                진심으로 환영합니다! <br />
                <br />
              </p>

              <p className="slide-notice-paragraph">
                아이두 마켓은 인덕대 학생들을 위한 중고 마켓 서비스이며, <br />{" "}
                서비스 준비과정을 마치고 8월 3일에 정식 오픈 되었습니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <h1>Notice 02</h1>
            <p className="slide-notice-paragraph">
              아이두 마켓은 서비스 이용자들을 인덕대 학생들을 특정해 서비스를
              오픈하는데에 의의가 있으며,
            </p>

            <p className="slide-notice-paragraph">
              코로나로 인해 당장에 활성화는 기대하기 어렵지만 많은 이용
              부탁드립니다.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <h1>Notice 03</h1>
            <p className="slide-notice-paragraph">
              서비스를 이용하시면서 불편한 점이나, 개선할 점이 있다면 언제든지
              고객 센터의 문의사항을 통해 남겨주시기 바랍니다.
            </p>

            <p className="slide-notice-paragraph">감사합니다.</p>
            <p className="slide-notice-paragraph">우아한 애자일 일동</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Notice;
