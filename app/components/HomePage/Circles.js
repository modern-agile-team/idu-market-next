import React from "react";
import Image from "next/image";

const Circles = () => {
  return (
    <section id="home-circles">
      <div className="container">
        <div className="circle-items">
          <div className="circle-item">
            <img src="/images/main_2.jpg" alt="동아리" className="circle-img" />
          </div>
          <div className="circles-desc-box">
            <h1>Idu Market</h1>
            <h2>
              전문 개발 동아리
              <br /> 우아한 애자일
            </h2>
            <p>
              아이두 마켓은 우아한 애자일에서 개발했으며 현재도 인덕대학교
              학생들을 위해 새로운 서비스를 개발중입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Circles;
