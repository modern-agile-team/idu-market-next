import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const Function = () => {
  const [scrollActionFuntion, setScrollActionFunction] = useState(false);

  const handleScroll = () => {
    const pageScrollY = window.scrollY;

    if (pageScrollY >= 300) setScrollActionFunction(true);
    else if (pageScrollY === 0) setScrollActionFunction(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home-function" className="home-function">
      <div className="container">
        <div className="function-items">
          <div className="function-desc-box">
            <h1>Idu Market</h1>
            <h2>
              인덕대학교 <br /> 중고마켓 서비스
            </h2>
            <p>
              아이두 마켓은 인덕대학교 학생들을 위한 중고거래 커뮤니케이션 등의
              서비스를 제공하고 있습니다.
            </p>
          </div>
          <div
            className={
              scrollActionFuntion ? "function-item show" : "function-item"
            }
          >
            <Image
              src="/images/main_1.jpg"
              alt="중고거래"
              className="function-img"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Function;
