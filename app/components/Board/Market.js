import React, { useState, useEffect } from "react";
import MarketListItem from "./MarketListItem";
import axios from "axios";

const Market = ({ categoryName }) => {
  const [productList, setProductList] = useState([]);

  const LAST_COUNT = 9;

  let isLoading = false;
  let lastNum = 0;

  const getMoreData = async () => {
    isLoading = true;
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}?lastNum=${lastNum}`
      )
      .then((response) => {
        if (response.data.success) {
          const result = response.data.boards;

          if (result.length < 10) {
            window.removeEventListener("scroll", handleScroll);
          } else {
            lastNum = result[LAST_COUNT].num;
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
  }, [categoryName]);

  return (
    <MarketListItem productList={productList} categoryName={categoryName} />
  );
};

export default Market;
