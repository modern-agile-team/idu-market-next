import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import UpdateEditor from "../../../../components/Editor/UpdateEdtior";
import BoardBanner from "../../../../components/Board/BoardBanner";

const BoardUpdatePage = () => {
  const router = useRouter();
  const { categoryName, num } = router.query;

  const { id } = useSelector((state) => state.auth);
  const board = useSelector((state) => state.board);

  useEffect(() => {
    if (id && board.studentId) {
      if (board.studentId !== id) {
        alert("잘못된 접근 방식입니다.");
        router.back();
      }
    } else if (!board.studentId) {
      alert("URL을 통한 접근은 금지하고 있습니다.");
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>IUAM | 게시판 수정</title>
      </Head>
      <BoardBanner
        title={
          categoryName === "notice" || categoryName === "free"
            ? "boards"
            : "Market"
        }
        desc="Update"
      />
      <section id="post-write" className="post-write">
        <div className="container">
          <UpdateEditor
            categoryName={categoryName}
            num={num}
            board={board}
            id={id}
          />
        </div>
      </section>
    </>
  );
};

export default BoardUpdatePage;
