import React from "react";

const NotificationItem = ({ noti, index, onChangeFlag }) => {
  return (
    <li
      className={
        noti.readFlag === 0 ? "notification-li nowatch" : "notification-li"
      }
      url={noti.url}
      num={noti.notificationNum}
      key={index}
      onClick={onChangeFlag}
    >
      <div
        className={
          noti.readFlag === 0
            ? "notification-status nowatch"
            : "notification-status"
        }
      />
      {(function () {
        if (noti.notiCategoryNum === 0) {
          return (
            <>
              {noti.boardTitle.length > 10 ? (
                <>
                  <b>'{noti.boardTitle.slice(0, 10)}...'</b> 게시물에 댓글이
                  달렸습니다.
                </>
              ) : (
                <>
                  <b>'{noti.boardTitle}'</b> 게시물에 댓글이 달렸습니다.
                </>
              )}
            </>
          );
        } else if (noti.notiCategoryNum === 1) {
          return (
            <>
              {noti.boardTitle.length > 10 ? (
                <>
                  <b>'{noti.boardTitle.slice(0, 10)}...'</b> 게시물에 답글이
                  달렸습니다.
                </>
              ) : (
                <>
                  <b>'{noti.boardTitle}'</b> 게시물에 답글이 달렸습니다.
                </>
              )}
            </>
          );
        } else {
          return (
            <>
              {noti.boardTitle.length > 10 ? (
                <>
                  <b>'{noti.boardTitle.slice(0, 10)}...'</b> 게시물 거래가
                  종료되었습니다.
                </>
              ) : (
                <>
                  <b>'{noti.boardTitle}'</b> 게시물 거래가 종료되었습니다.
                </>
              )}
            </>
          );
        }
      })()}
    </li>
  );
};

export default NotificationItem;
