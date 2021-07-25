import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import MainBanner from "../components/HomePage/MainBanner";
import Function from "../components/HomePage/Function";
import Circles from "../components/HomePage/Circles";
import Introduce from "../components/HomePage/Introduce";
import Notice from "../components/HomePage/Notice";
import Articles from "../components/HomePage/Articles";

import { SliderData } from "../Data/NoticeSliderData";

export default function Home() {
  const [mainBannerOffsetTop, setMainBannerOffsetTop] = useState();
  const [functionOffsetTop, setFunctionOffsetTop] = useState();
  const [circlesOffsetTop, setCirclesOffsetTop] = useState();
  const [introduceOffsetTop, setIntroduceOffsetTop] = useState();
  const [noticeOffsetTop, setNoticeOffsetTop] = useState();
  const [articlesOffsetTop, setArticlesOffsetTop] = useState();
  const [footerOffsetTop, setFooterOffsetTop] = useState();

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
      <MainBanner
        getOffsetTop={(offset) => setMainBannerOffsetTop(offset)}
        nextSectionOffset={functionOffsetTop ? functionOffsetTop : undefined}
      />
      <Function
        getOffsetTop={(offset) => setFunctionOffsetTop(offset)}
        nextSectionOffset={circlesOffsetTop ? circlesOffsetTop : undefined}
        prevSectionOffset={introduceOffsetTop ? mainBannerOffsetTop : undefined}
      />
      <Circles
        getOffsetTop={(offset) => setCirclesOffsetTop(offset)}
        nextSectionOffset={introduceOffsetTop ? introduceOffsetTop : undefined}
        prevSectionOffset={functionOffsetTop ? functionOffsetTop : undefined}
      />
      <Introduce
        getOffsetTop={(offset) => setIntroduceOffsetTop(offset)}
        nextSectionOffset={noticeOffsetTop ? noticeOffsetTop : undefined}
        prevSectionOffset={circlesOffsetTop ? circlesOffsetTop : undefined}
      />
      <Notice
        slides={SliderData}
        getOffsetTop={(offset) => setNoticeOffsetTop(offset)}
        nextSectionOffset={articlesOffsetTop ? articlesOffsetTop : undefined}
        prevSectionOffset={introduceOffsetTop ? introduceOffsetTop : undefined}
      />
      <Articles
        getOffsetTop={(offset) => setArticlesOffsetTop(offset)}
        getFooterOffsetTop={(target) => setFooterOffsetTop(target)}
        nextSectionOffset={footerOffsetTop ? footerOffsetTop : undefined}
        prevSectionOffset={noticeOffsetTop ? noticeOffsetTop : undefined}
      />
    </div>
  );
}
