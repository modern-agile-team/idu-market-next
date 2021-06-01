import React from "react";
import Link from "next/link";

const Page404 = () => {
  return (
    <section className="nomatch" id="nomatch">
      <div className="container">
        <div className="nomatch-text-box">
          <p className="nomatch-404">404</p>
          <p className="nomatch-error">ERROR!</p>
          <p className="nomatch-desc">
            해당 페이지가 존재하지 않거나 사용할 수 없습니다
          </p>
        </div>
        <div className="nomatch-button-box">
          <Link href="/">
            <a className="nomatch-button">홈으로 돌아가기</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
