import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineComment } from "react-icons/ai";

const BoardListItem = ({ productList, categoryName, profile }) => {
  const router = useRouter();

  return (
    <>
      {productList.map((board) => {
        return (
          <div className="market-items" key={board.num}>
            <Link
              href={
                profile
                  ? `/boards/${board.categoryName}/${board.num}`
                  : `/boards/${categoryName}/${board.num}`
              }
              className="market-img-box-link"
            >
              <div className="market-img-box">
                <img src={board.thumbnail} alt="test" />
              </div>
            </Link>

            <Link
              href={
                profile
                  ? `/boards/${board.categoryName}/${board.num}`
                  : `/boards/${categoryName}/${board.num}`
              }
            >
              <h1 className="market-item-title">{board.title}</h1>
            </Link>

            <p className="market-item-price">{board.price}원</p>

            <p className="market-item-id">
              {board.sellerName ? (
                <>
                  <Link
                    href={`/students/${board.sellerId}`}
                    className={
                      board.sellerName.length > 6 ? "longId" : "shortId"
                    }
                  >
                    <img
                      src={board.profilePath}
                      alt="프로필 이미지"
                      className="board-profile-img"
                    />
                    {board.sellerName} &nbsp;
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/students/${board.studentId}`}
                    className={board.nickname.length > 6 ? "longId" : "shortId"}
                  >
                    <img
                      src={board.profilePath}
                      alt="프로필 이미지"
                      className="board-profile-img"
                    />
                    {board.nickname} &nbsp;
                  </Link>
                </>
              )}

              <AiOutlineComment />
              {board.commentCount}
            </p>
            <p className="market-item-date">{board.inDate.substring(0, 10)}</p>
          </div>
        );
      })}
    </>
  );
};

export default BoardListItem;
