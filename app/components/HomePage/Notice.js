import React from "react";
import Image from "next/image";

import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Pagination]);

const Notice = ({ slides }) => {
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
                  <img src="/images/chat1.png" alt="qna" />
                </div>
                <div className="chat2-img">
                  <img src="/images/chat2.png" alt="qna" />
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
                  <img src="/images/chat3.png" alt="qna" />
                </div>
                <div className="chat2-img">
                  <img src="/images/chat4.png" alt="qna" />
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
                  <img src="/images/chat5.png" alt="qna" />
                </div>
                <div className="chat2-img">
                  <img src="/images/chat6.png" alt="qna" />
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
                  <img src="/images/chat7.png" alt="qna" />
                </div>
                <div className="chat2-img">
                  <img src="/images/chat8.png" alt="qna" />
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
