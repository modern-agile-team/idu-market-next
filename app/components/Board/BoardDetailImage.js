import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination, Scrollbar, Navigation]);

const BoardDetailImage = ({
  boardDetail,
  currentImage,
  nextSlide,
  prevSlide,
}) => {
  return (
    <>
      <Swiper
        // loop={true}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
      >
        {boardDetail.images ? (
          boardDetail.images.map((image, index) => {
            return (
              <SwiperSlide>
                <div className="detail-slide">
                  <img src={image} alt="이미지" className="detail-image" />
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <></>
        )}
      </Swiper>
    </>
  );
};

export default BoardDetailImage;
