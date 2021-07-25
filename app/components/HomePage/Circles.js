import React, { useEffect, useRef } from "react";

const Circles = ({ prevSectionOffset, nextSectionOffset, getOffsetTop }) => {
  const ref = useRef();
  const onWheel = (e) => {
    if (e.deltaY >= 100) {
      window.scrollTo({ top: nextSectionOffset });
    } else {
      window.scrollTo({ top: prevSectionOffset });
    }
  };

  useEffect(() => {
    getOffsetTop(ref.current.offsetTop);
  }, []);
  return (
    <section ref={ref} id="home-circles" onWheel={onWheel}>
      <div className="container">
        <div className="circle-items">
          <div className="circle-item">
            <img
              src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/circles.jpg"
              alt="동아리"
              className="circle-img"
            />
          </div>
          <div className="circles-desc-box">
            <h1>Idu Market</h1>
            <h2>
              인덕대학교 전문 개발동아리 <span>우아한 애자일</span>
            </h2>
            <p>
              아이두 마켓은 우아한 애자일에서 개발되었으며 현재도 인덕대학교
              학생들을 위해 새로운 서비스를 개발중입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Circles;
