import React from "react";
import BoardListTop from "./BoardListTop";
import MarketListItem from "./MarketListItem";
import Loading from "../Loading/Loading";

const Market = ({ categoryName, productList }) => {
  return (
    <section className="market" id="market">
      <BoardListTop boardType="market" categoryName={categoryName} />

      <div className="container">
        {productList.length > 0 ? (
          <MarketListItem
            productList={productList}
            categoryName={categoryName}
          />
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Market;
