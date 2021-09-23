import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useGetMarketList = (categoryName) => {
  const [productList, setProductList] = useState([]);
  const lastNum = useRef(0);
  const lastCount = useRef(9);
  const isLoading = useRef(false);

  const getMoreData = async () => {
    isLoading.current = true;
    await axios
      .get(`/api/boards/${categoryName}?lastNum=${lastNum.current}`)
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
    isLoading.current = false;
  };

  const handleScroll = () => {
    const { documentElement } = document;
    const scrollHeight = documentElement.scrollHeight;
    const scrollTop = documentElement.scrollTop;
    const clientHeight = documentElement.clientHeight;

    if (scrollTop + clientHeight + 200 >= scrollHeight && !isLoading.current) {
      getMoreData();
    }
  };

  useEffect(() => {
    getMoreData();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { productList };
};
