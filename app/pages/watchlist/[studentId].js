import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";

import BoardBanner from "../../components/Board/BoardBanner";
import MarketListItem from "../../components/Board/MarketListItem";

const Watchlist = () => {
  const [productList, setProductList] = useState([]);

  const router = useRouter();
  const { studentId } = router.query;

  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id.length > 0) {
      if (studentId !== id) {
        alert("잘못된 접근입니다.");
        router.push("/");
      } else {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${studentId}`)
          .then((response) => {
            if (response.data.success) {
              const result = response.data.watchLists;
              setProductList(result);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>IUAM | 관심 목록</title>
      </Head>
      <BoardBanner title="Profile" desc="watchlist" />
      <section className="market" id="market">
        <h1 className="watchlist-title">
          {`관심 목록 (${productList.length})`}
        </h1>
        <div className="container">
          {productList.length > 0 ? (
            <MarketListItem productList={productList} profile />
          ) : (
            <h1 className="empty-list-desc">관심목록이 비어있습니다.</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Watchlist;
