import React, { useState, useRef, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Autoplay, Pagination]);

const Notice = ({ slides }) => {
  const SLIDES_LENGTH = slides.length;

  return (
    <section id="home-notice" className="home-notice">
      <Swiper
        spaceBetween={1}
        spaceBetween={40}
        loop={true}
        pagination={{ dynamicBullets: true }}
      >
        <SwiperSlide>
          <div className="slide-container">
            <div className="slide-notice-container">
              <div className="backgorund-container">
                <h1>QnA 01</h1>
              </div>
              <div className="chat-container">
                <div className="chat1-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat3.png"
                    alt=""
                  />
                </div>
                <div className="chat2-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <div className="slide-notice-container">
              <div className="backgorund-container">
                <h1>QnA 02</h1>
              </div>
              <div className="chat-container">
                <div className="chat1-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat1.png"
                    alt=""
                  />
                </div>
                <div className="chat2-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <div className="slide-notice-container">
              <div className="backgorund-container">
                <h1>QnA 03</h1>
              </div>
              <div className="chat-container">
                <div className="chat1-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat5.png"
                    alt=""
                  />
                </div>
                <div className="chat2-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat6.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <div className="slide-notice-container">
              <div className="backgorund-container">
                <h1>QnA 04</h1>
              </div>
              <div className="chat-container">
                <div className="chat1-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat7.png"
                    alt=""
                  />
                </div>
                <div className="chat2-img">
                  <img
                    src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/noticeChat/chat8.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Notice;
