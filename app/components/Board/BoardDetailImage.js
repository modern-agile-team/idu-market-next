import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const BoardDetailImage = ({
  boardDetail,
  currentImage,
  nextSlide,
  prevSlide,
}) => {
  return (
    <section className="board-detail-image">
      {boardDetail.images ? (
        boardDetail.images.map((image, index) => {
          return (
            <div
              className={
                index === currentImage ? "detail-slide active" : "detail-slide"
              }
              key={index}
            >
              <img src={image} alt="이미지" className="detail-image" />
            </div>
          );
        })
      ) : (
        <></>
      )}

      {boardDetail.images.length > 0 ? (
        <div className="detail-arrow-box">
          <BsChevronCompactLeft
            className="detail-left-arrow"
            onClick={prevSlide}
          />
          <BsChevronCompactRight
            className="detail-right-arrow"
            onClick={nextSlide}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="detail-slide-btns">
        {boardDetail.images ? (
          boardDetail.images.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  currentImage === index
                    ? "detail-slide-btn active"
                    : "detail-slide-btn"
                }
                onClick={() => setCurrentImage(index)}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default BoardDetailImage;
