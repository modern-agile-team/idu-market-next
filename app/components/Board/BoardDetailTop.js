import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsCalendar, BsTag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  BOARD_DELETE_REQUEST,
  BOARD_STATUS_REQUEST,
  IMAGE_DELETE_REQUEST,
} from "../../redux/types";

const BoardDetailTop = ({ boardDetail, categoryName, num }) => {
  const [tradeSentence, setTradeSentence] = useState("판매중");
  const [dropStatus, setDropStatus] = useState(false);

  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.board);
  const studentId = useSelector((state) => state.auth.id);

  const router = useRouter();

  useEffect(() => {
    if (boardDetail.status === 0) {
      setTradeSentence("판매중");
    } else if (boardDetail.status === 1) {
      setTradeSentence("예약중");
    } else if (boardDetail.status === 2) {
      setTradeSentence("거래완료");
    }
  }, [boardDetail]);

  const deleteImage = () => {
    const body = {
      url: [],
    };

    body.url = [...images];
    if (body.url.length > 0) {
      dispatch({
        type: IMAGE_DELETE_REQUEST,
        payload: body,
      });
    }
  };

  const onTradeSentenceChange = (e) => {
    e.preventDefault();

    setTradeSentence(e.target.textContent);

    if (e.target.textContent === "판매중") {
      const body = {
        categoryName,
        num,
        status: 0,
      };
      dispatch({
        type: BOARD_STATUS_REQUEST,
        payload: body,
      });
    }
    if (e.target.textContent === "예약중") {
      const body = {
        categoryName,
        num,
        status: 1,
      };
      dispatch({
        type: BOARD_STATUS_REQUEST,
        payload: body,
      });
    }
    if (e.target.textContent === "거래완료") {
      const body = {
        categoryName,
        num,
        status: 2,
      };

      dispatch({
        type: BOARD_STATUS_REQUEST,
        payload: body,
      });
    }
  };

  const onDelete = (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말 게시물을 삭제하시겠습니까?");

    if (confirm) {
      deleteImage();

      dispatch({
        type: BOARD_DELETE_REQUEST,
        payload: {
          categoryName,
          num,
        },
      });

      router.push(`/boards/${categoryName}`);
    }
  };

  return (
    <div className="detail-top-box">
      <h1 className="detail-title">{boardDetail.title}</h1>

      {categoryName === "free" || categoryName === "notice" ? (
        ""
      ) : (
        <p className="detail-price">{boardDetail.price}원</p>
      )}

      <div className="detail-btn-box">
        {boardDetail.studentId === studentId ? (
          <>
            <Link href={`/boards/${categoryName}/${num}/update`}>
              <a className="detail-btn-edit">수정</a>
            </Link>
            <button className="detail-btn-delete" onClick={onDelete}>
              삭제
            </button>
            <Link
              href={(function () {
                if (categoryName === "purchase-list")
                  return `/purchase-list/${studentId}`;
                else if (categoryName === "sale-list")
                  return `/sale-list/${studentId}`;
                else return `/boards/${categoryName}`;
              })()}
            >
              <a className="detail-btn-list">목록</a>
            </Link>
          </>
        ) : (
          <>
            <Link
              href={(function () {
                if (categoryName === "watchlist")
                  return `/watchlist/${studentId}`;
                else return `/boards/${categoryName}`;
              })()}
            >
              <a className="detail-btn-list">목록</a>
            </Link>
          </>
        )}
      </div>

      <div className="detail-date-student">
        <p>
          <img
            src={boardDetail.profilePath}
            alt="프로필 이미지"
            className="detail-profile-img"
          />
          &nbsp;{boardDetail.nickname}
        </p>
        <p>
          <BsCalendar />
          &nbsp;{boardDetail.inDate.substring(0, 16)}
        </p>
        <p>
          <BsTag />
          &nbsp;{boardDetail.hit}
        </p>
      </div>

      {categoryName === "free" || categoryName === "notice" ? (
        <></>
      ) : (
        <>
          {boardDetail.studentId === studentId ? (
            <div className="detail-trade-status-box">
              {boardDetail.status === 2 ? (
                <Link
                  href={`/boards/${categoryName}/${num}/${studentId}/complete`}
                >
                  <a className="trade-complete-btn">거래완료</a>
                </Link>
              ) : (
                <></>
              )}

              <ul>
                <li
                  className="detail-trade-status"
                  onClick={() => setDropStatus(!dropStatus)}
                >
                  {(function () {
                    if (boardDetail.status === 0)
                      return (
                        <>
                          <span className="trade-status sale"></span>{" "}
                          {tradeSentence}
                          <IoMdArrowDropdown />
                        </>
                      );
                    if (boardDetail.status === 1)
                      return (
                        <>
                          <span className="trade-status reservation"></span>{" "}
                          {tradeSentence}
                          <IoMdArrowDropdown />
                        </>
                      );
                    if (boardDetail.status === 2)
                      return (
                        <>
                          <span className="trade-status complete"></span>{" "}
                          {tradeSentence}
                          <IoMdArrowDropdown />
                        </>
                      );
                  })()}

                  {dropStatus ? (
                    <ul className="detail-trade-status-drop">
                      <li value="판매중" onClick={onTradeSentenceChange}>
                        <span className="trade-status sale"></span>판매중
                      </li>
                      <li value="예약중" onClick={onTradeSentenceChange}>
                        <span className="trade-status reservation"></span>예약중
                      </li>
                      <li value="거래완료" onClick={onTradeSentenceChange}>
                        <span className="trade-status complete"></span>거래완료
                      </li>
                    </ul>
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      {/* {categoryName === "free" ||
      categoryName === "notice" ||
      studentId.length === 0 ? (
        <></>
      ) : (
        <>
          {boards.studentId === studentId ? (
            <></>
          ) : boards.isWatchList === 1 ? (
            <WatchlistDeleteComponent />
          ) : (
            <WatchlistAddComponent categoryName={categoryName} />
          )}
        </>
      )} */}
    </div>
  );
};

export default BoardDetailTop;
