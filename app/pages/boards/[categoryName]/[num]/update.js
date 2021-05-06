import React from "react";
import BoardBanner from "../../../../components/Board/BoardBanner";
import Head from "next/head";
import { useRouter } from "next/router";
import UpdateEditor from "../../../../components/Editor/UpdateEdtior";

const Update = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>IUAM | 수정</title>
      </Head>
      <BoardBanner
        title={
          router.query === "notice" || router.query === "free"
            ? "boards"
            : "Market"
        }
        desc="Update"
      />
      <section id="post-write" className="post-write">
        <div className="container">
          <UpdateEditor />
        </div>
      </section>
    </>
  );
};

export default Update;
