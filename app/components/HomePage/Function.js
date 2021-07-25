import React, { useEffect, useState, useRef } from "react";

const Function = ({ prevSectionOffset, nextSectionOffset, getOffsetTop }) => {
  const [scrollActionFuntion, setScrollActionFunction] = useState(false);
  const ref = useRef();

  const handleScroll = () => {
    const pageScrollY = window.scrollY;

    if (pageScrollY >= 300) setScrollActionFunction(true);
    else if (pageScrollY === 0) setScrollActionFunction(false);
  };

  const onWheel = (e) => {
    if (e.deltaY >= 100) {
      window.scrollTo({ top: nextSectionOffset });
    } else {
      window.scrollTo({ top: prevSectionOffset });
    }
  };

  useEffect(() => {
    getOffsetTop(ref.current.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      onWheel={onWheel}
      id="home-function"
      className="home-function"
    >
      <div className="container">
        <div className="function-items">
          <div className="function-desc-box">
            <h1>Idu Market</h1>
            <h2>인덕대학교 학생들을 위한 중고마켓 서비스</h2>
            <p>
              아이두 마켓은 인덕대학교 학생들을 위한 중고거래 커뮤니케이션 등을
              할 수 있는 서비스를 제공하고 있습니다.
            </p>
          </div>
          <div
            className={
              scrollActionFuntion ? "function-item show" : "function-item"
            }
          >
            <img
              src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/trade.jpg"
              alt="중고거래"
              className="function-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Function;
