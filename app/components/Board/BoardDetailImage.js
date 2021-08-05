import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import SwiperCore, { Autoplay, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Pagination, Scrollbar]);

const BoardDetailImage = ({
  boardDetail,
  currentImage,
  nextSlide,
  prevSlide,
}) => {
  console.log(boardDetail.images);
  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          type: "progressbar",
        }}
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
