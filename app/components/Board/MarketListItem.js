import React from "react";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";

const MarketListItem = ({ productList, categoryName, profile }) => {
  console.log(productList);
  return (
    <>
      {productList.map((board) => {
        return (
          <div
            className="market-items"
            key={profile ? board.boardNum : board.num}
          >
            <Link
              href={
                profile
                  ? `/boards/${board.categoryName}/${board.boardNum}`
                  : `/boards/${categoryName}/${board.num}`
              }
            >
              <a className="market-img-box-link">
                <div className="market-img-box">
                  <img src={board.thumbnail} alt="test" />
                </div>
              </a>
            </Link>

            <Link
              href={
                profile
                  ? `/boards/${board.categoryName}/${board.num}`
                  : `/boards/${categoryName}/${board.num}`
              }
            >
              <a>
                <h1 className="market-item-title">{board.title}</h1>
              </a>
            </Link>

            <p className="market-item-price">{board.price}원</p>

            <p className="market-item-id">
              {board.sellerName ? (
                <>
                  <Link href={`/students/${board.sellerId}`}>
                    <a
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
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/students/${board.studentId}`}>
                    <a
                      className={
                        board.nickname.length > 6 ? "longId" : "shortId"
                      }
                    >
                      <img
                        src={board.profilePath}
                        alt="프로필 이미지"
                        className="board-profile-img"
                      />
                      {board.nickname} &nbsp;
                    </a>
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

export default MarketListItem;
