import React from "react";
import { useRouter } from "next/router";
import BoardListTop from "../../components/Board/BoardListTop";
import BoardBanner from "../../components/Board/BoardBanner";

const Category = () => {
  const router = useRouter();

  return (
    <>
      <BoardBanner title="Market" desc={`${router.query.categoryName}`} />
      <section className="market" id="market">
        <BoardListTop />
      </section>
    </>
  );
};

export default Category;
