import React from "react";
import { useRouter } from "next/router";
import BoardBanner from "../../../components/Board/BoardBanner";
import dynamic from "next/dynamic";
import Editor from "../../../components/Editor/Editor";

const New = () => {
  const router = useRouter();

  return (
    <>
      <BoardBanner title="Market" desc="book" />
      <section id="post-write" className="post-write">
        <div className="container">
          <Editor />
        </div>
      </section>
    </>
  );
};

export default New;
