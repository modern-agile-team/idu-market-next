import React, { useState, useEffect } from "react";
import axios from "axios";

import { AiOutlineArrowUp } from "react-icons/ai";

import BoardListTop from "./BoardListTop";
import MarketListItem from "./MarketListItem";

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

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getMoreData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categoryName]);

  return (
    <section className="market" id="market">
      <button className="scroll-top-btn" onClick={scrollTop}>
        <AiOutlineArrowUp />
      </button>

      <BoardListTop categoryName={categoryName} />

      <div className="container">
        {productList.length > 0 ? (
          <MarketListItem
            productList={productList}
            categoryName={categoryName}
          />
        ) : (
          <h1 className="empty-list-desc">거래 장터 목록이 비어있습니다.</h1>
        )}
      </div>
    </section>
  );
};

export default Market;
