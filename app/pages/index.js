import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import MainBanner from "../components/HomePage/MainBanner";
import Function from "../components/HomePage/Function";
import Introduce from "../components/HomePage/Introduce";
import Notice from "../components/HomePage/Notice";
import Articles from "../components/HomePage/Articles";

import { SliderData } from "../Data/NoticeSliderData";
import Circles from "../components/HomePage/Circles";

export default function Home() {
  const MainBannerOffsetTop = document.querySelector("#main-banner").offsetTop;
  const functionOffsetTop = document.querySelector("#home-function").offsetTop;
  const circlesOffsetTop = document.querySelector("#home-circles").offsetTop;
  const introduceOffsetTop =
    document.querySelector("#home-introduce").offsetTop;
  const articlesOffsetTop = document.querySelector("#home-articles").offsetTop;
  const noticeOffsetTop = document.querySelector("#home-notice").offsetTop;
  const footerOffsetTop = document.querySelector("#footer").offsetTop;

  useEffect(() => {
    const body = document.body;

    body.style.overflow = "hidden";

    return () => (body.style.overflow = "");
  }, []);

  return (
    <div id="Home-main-container">
      <Head>
        <title>IUAM | 홈 화면</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBanner nextSectionOffset={functionOffsetTop}></MainBanner>
      <Function
        prevSectionOffset={MainBannerOffsetTop}
        nextSectionOffset={circlesOffsetTop}
      />
      <Circles
        prevSectionOffset={functionOffsetTop}
        nextSectionOffset={introduceOffsetTop}
      />
      <Introduce
        prevSectionOffset={circlesOffsetTop}
        nextSectionOffset={noticeOffsetTop}
      />
      <Notice
        slides={SliderData}
        prevSectionOffset={introduceOffsetTop}
        nextSectionOffset={articlesOffsetTop}
      />
      <Articles
        prevSectionOffset={noticeOffsetTop}
        nextSectionOffset={footerOffsetTop}
      />
    </div>
  );
}
