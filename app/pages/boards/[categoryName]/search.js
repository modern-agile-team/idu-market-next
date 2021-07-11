import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import BoardListTop from "../../../components/Board/BoardListTop";
import MarketListItem from "../../../components/Board/MarketListItem";
import BoardListItem from "../../../components/Board/BoardListItem";
import BoardBanner from "../../../components/Board/BoardBanner";
import { API_KEY } from "../../../Data/API_KEY";
import Head from "next/head";

const BoardSearchPage = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const router = useRouter();
  const { content, categoryName } = router.query;

  const perPage = 10;
  const pageVisited = pageNumber * perPage;
  const pageCount = Math.ceil(boardList.length / perPage);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search?categoryName=${categoryName}&content=${content}`,
        { headers: { "api-key": API_KEY } }
      )
      .then((response) => {
        if (response.data.success) {
          const result = response.data.boards;

          setBoardList(result);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 400) {
          alert("키워드를 입력해주세요.");
        }
      });
  }, [content, categoryName]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayBoardList = boardList
    .slice(pageVisited, pageVisited + perPage)
    .map((boardItem) => {
      return (
        <tr key={boardItem.num}>
          <td>{boardItem.num}</td>
          <td className="boardlist-common-title">
            <Link href={`/boards/${categoryName}/${boardItem.num}`}>
              <a>{boardItem.title}</a>
            </Link>
          </td>
          <td>
            <Link href={`/students/${boardItem.studentId}`}>
              <a className="boardlist-common-nickname">{boardItem.nickname}</a>
            </Link>
          </td>
          <td className="boardlist-common-td">
            {boardItem.inDate.substring(0, 10)}
          </td>
          <td>{boardItem.hit}</td>
        </tr>
      );
    });

  return (
    <>
      <Head>
        <title>IUAM | 검색</title>
      </Head>
      <BoardBanner title="Boards" desc={categoryName} />
      {categoryName === "free" || categoryName === "notice" ? (
        <section id="boardlist-common" className="boardlist-common">
          <BoardListTop categoryName={categoryName} />
          <div className="container">
            {boardList.length === 0 ? (
              <p className="search-null-desc">
                검색어와 관련된 게시물이 존재하지 않습니다.
              </p>
            ) : (
              <BoardListItem
                displayBoardList={displayBoardList}
                pageCount={pageCount}
                changePage={changePage}
              />
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="market" id="market">
            <>
              <BoardListTop categoryName={categoryName} />

              <div className="container">
                {boardList.length === 0 ? (
                  <p className="search-null-desc">
                    검색어와 관련된 게시물이 존재하지 않습니다.
                  </p>
                ) : (
                  <MarketListItem
                    productList={boardList}
                    categoryName={categoryName}
                  />
                )}
              </div>
            </>
          </section>
        </>
      )}
    </>
  );
};

export default BoardSearchPage;
