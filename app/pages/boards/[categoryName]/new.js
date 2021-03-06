import React from "react";
import { useRouter } from "next/router";
import BoardBanner from "../../../components/Board/BoardBanner";
import Editor from "../../../components/Editor/Editor";
import Head from "next/head";

const BoardNewPage = () => {
  const router = useRouter();
  const { categoryName } = router.query;

  return (
    <>
      <Head>
        <title>IUAM | 게시글 작성</title>
      </Head>
      <BoardBanner
        title={
          router.query === "notice" || router.query === "free"
            ? "boards"
            : "Market"
        }
        desc="write"
      />
      <section id="post-write" className="post-write">
        <div className="container">
          <Editor categoryName={categoryName} />
        </div>
      </section>
    </>
  );
};

export default BoardNewPage;
