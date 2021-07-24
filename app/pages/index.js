import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import MainBanner from "../components/HomePage/MainBanner";
import Function from "../components/HomePage/Function";
import Introduce from "../components/HomePage/Introduce";
import Notice from "../components/HomePage/Notice";
import Articles from "../components/HomePage/Articles";

import { SliderData } from "../Data/NoticeSliderData";

export default function Home() {
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
      <MainBanner></MainBanner>
      <Function></Function>
      <Introduce></Introduce>
      <Notice slides={SliderData}></Notice>
      <Articles />
    </div>
  );
}
