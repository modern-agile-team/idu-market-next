import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TRADE_COMPLETE_REQUEST } from "../../redux/types";

const TradeComplete = ({ buyers, nickname, categoryName, num }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onConfirmTrade = (e) => {
    const confirmBuyer = window.confirm(
      `${e.target.textContent}님으로 결정하시겠습니까?`
    );

    if (confirmBuyer) {
      const body = {
        categoryName,
        boardNum: num,
        nickname: e.target.textContent,
      };

      dispatch({
        type: TRADE_COMPLETE_REQUEST,
        payload: body,
      });

      alert("거래가 종료되었습니다.");
      router.back();
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
              console.log(buyer);
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
