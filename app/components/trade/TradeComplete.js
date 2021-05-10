import React from "react";

const TradeComplete = ({ buyers, nickname }) => {
  console.log(buyers, nickname);
  return (
    <>
      {buyers ? (
        <h1 className="trade-buyer-number">{`구매 요청 인원 (${(function () {
          let count = 0;

          if (buyers.length === 1) {
            if (buyers[0].nickname === nickname) {
              return (count = 0);
            }
          }
          for (let el in buyers) {
            if (el !== nickname) count++;
            return count;
          }
          if (buyers.length === 0) {
            return (count = 0);
          }
        })()})`}</h1>
      ) : (
        <></>
      )}
      {/* <div className="trade-buyer-box">
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
      </div> */}
    </>
  );
};

export default TradeComplete;
