import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import BoardBanner from "../../components/Board/BoardBanner";
import Market from "../../components/Board/Market";
import { API_KEY } from "../../Data/API_KEY";

const MarketClothesPage = () => {
  const [productList, setProductList] = useState([]);
  const lastNum = useRef(0);
  const lastCount = useRef(9);

  const categoryName = "clothes";
  let isLoading = false;

  const router = useRouter();

  const getMoreData = async () => {
    isLoading = true;
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}?lastNum=${lastNum.current}`,
        { headers: { "api-key": API_KEY } }
      )
      .then((response) => {
        if (response.data.success) {
          const result = response.data.boards;

          if (result.length < 10) {
            window.removeEventListener("scroll", handleScroll);
          } else {
            lastNum.current = result[lastCount.current].num;
          }
          setProductList((prev) => [...prev, ...result]);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 400) {
          console.log(response.data.msg);
        }
      });
    isLoading = false;
  };

  const handleScroll = () => {
    const { documentElement } = document;
    const scrollHeight = documentElement.scrollHeight;
    const scrollTop = documentElement.scrollTop;
    const clientHeight = documentElement.clientHeight;

    if (scrollTop + clientHeight + 200 >= scrollHeight && isLoading === false) {
      getMoreData();
    }
  };

  useEffect(() => {
    getMoreData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categoryName, router.pathname]);

  return (
    <>
      <Head>
        <title>IUAM | 거래 장터</title>
      </Head>
      <BoardBanner title="Market" desc={categoryName} />
      <Market categoryName={categoryName} productList={productList} />
    </>
  );
};

export default MarketClothesPage;
