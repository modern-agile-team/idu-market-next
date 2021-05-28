import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const TradeComplete = ({ buyers, nickname, categoryName, num }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const board = useSelector((state) => state.board);

  const onConfirmTrade = (e) => {
    const confirmBuyer = window.confirm(
      `${e.target.textContent}님으로 결정하시겠습니까?`
    );

    let studentId = "";

    buyers.map((buyer) => {
      if (buyer.nickname === e.target.textContent) {
        studentId = buyer.id;
      }
    });

    if (confirmBuyer) {
      const body = {
        notiCategoryNum: 2,
        senderNickname: board.nickname,
        recipientNicknames: [e.target.textContent],
        url: `https://idu-market.shop/boards/${categoryName}/${num}`,
        boardNum: num,
        studentId,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/purchase-list`, body)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            alert("거래가 종료되었습니다.");
            router.back();
          }
        })
        .catch((err) => {
          const response = err.response;
          alert(response.data.msg);
        });
    }
  };
  return (
    <>
      {buyers ? (
        <h1 className="trade-buyer-number">
          {`구매 요청 인원 (${(function () {
            let count = 0;

            if (buyers.length === 1) {
              if (buyers[0].nickname === nickname) {
                return (count = 0);
              }
            }
            for (let buyer in buyers) {
              if (buyers[buyer].nickname !== nickname) count++;
            }
            if (buyers.length === 0) {
              return (count = 0);
            }

            return count;
          })()})`}{" "}
          <p>(구매 확정 지을 인원을 선택해주세요.)</p>
        </h1>
      ) : (
        <></>
      )}
      <div className="trade-buyer-box">
        {buyers && nickname ? (
          <>
            {buyers.map((buyer, index) => {
              if (buyer.nickname !== nickname) {
                return (
                  <div
                    className="trade-buyer"
                    key={index}
                    onClick={onConfirmTrade}
                  >
                    {buyer.nickname}
                  </div>
                );
              } else return null;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TradeComplete;
