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
  return (
    <div id="Home-main-container">
      <Head>
        <title>IUAM | 홈 화면</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBanner />
      <Function />
      <Circles />
      <Introduce />
      <Notice slides={SliderData} />
      <Articles />
    </div>
  );
}
