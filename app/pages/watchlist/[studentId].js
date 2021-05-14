import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BoardBanner from "../../components/Board/BoardBanner";
import Head from "next/head";
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
              const result = response.data.boards;
              setProductList(result);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [studentId, id]);

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
          <MarketListItem productList={productList} profile />
        </div>
      </section>
    </>
  );
};

export default Watchlist;
