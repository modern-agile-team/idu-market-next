import React, { useEffect, useState } from "react";

const Function = () => {
  const [scrollActionFuntion, setScrollActionFunction] = useState(false);

  function functionHandleScroll() {
    let pageScrollY = window.scrollY;

    if (pageScrollY > 250) setScrollActionFunction(true);
    else setScrollActionFunction(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", functionHandleScroll);

    return () => {
      window.removeEventListener("scroll", functionHandleScroll);
    };
  }, []);

  return (
    <section id="home-function" className="home-function">
      <div className="container">
        <div
          className={
            scrollActionFuntion ? "function-items show" : "function-items"
          }
        >
          <div className="function-item shopping">
            <img
              src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/shopping.png"
              alt="중고거래"
              className="function-img"
            />
            <p className="function-desc">Deal With Article</p>
          </div>
          <div className="function-item communication">
            <img
              src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/communication.png"
              alt="커뮤니케이션"
              className="function-img"
            />
            <p className="function-desc">Communication</p>
          </div>
          <div className="function-item information">
            <img
              src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/HomePage/information.png"
              alt="정보"
              className="function-img"
            />
            <p className="function-desc">
              University <br />
              Information
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Function;
