import React, { useEffect } from "react";
import BoardBanner from "../../../../components/Board/BoardBanner";
import Head from "next/head";
import { useRouter } from "next/router";
import UpdateEditor from "../../../../components/Editor/UpdateEdtior";
import { useSelector } from "react-redux";

const BoardUpdatePage = () => {
  const router = useRouter();
  const { categoryName, num } = router.query;

  const { id } = useSelector((state) => state.auth);
  const board = useSelector((state) => state.board);

  useEffect(() => {
    if (id.length > 0 && board.studentId.length > 0) {
      if (board.studentId !== id) {
        alert("잘못된 접근 방식입니다.");
        router.back();
      }
    } else if (board.studentId.length === 0) {
      alert("URL을 통한 접근을 금지합니다.");
      router.back();
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
