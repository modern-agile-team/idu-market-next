import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { IoMdNotifications } from "react-icons/io";
import {
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_GET_REQUEST,
} from "../../redux/types";

const Notification = ({ studentId }) => {
  const [onNotification, setOnNotification] = useState(false);

  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const refEl = useRef(null);

  useEffect(() => {
    const body = {
      studentId,
    };

    dispatch({
      type: NOTIFICATION_GET_REQUEST,
      payload: body,
    });

    const menuClickEvent = (e) => {
      if (refEl.current !== null && !refEl.current.contains(e.target))
        setOnNotification(!onNotification);
    };

    if (onNotification) window.addEventListener("click", menuClickEvent);
    return () => window.removeEventListener("click", menuClickEvent);
  }, [onNotification]);

  const onClick = (e) => {
    e.preventDefault();

    setOnNotification(!onNotification);
  };

  const onChangeFlag = (e) => {
    e.preventDefault();

    const body = {
      notificationNum: e.target.getAttribute("num"),
    };

    dispatch({
      type: NOTIFICATION_CHANGE_REQUEST,
      payload: body,
    });
  };

  return (
    <div className="header-notification">
      <IoMdNotifications
        className={
          onNotification ? "notification-icon focus" : "notification-icon"
        }
        onClick={onClick}
      />

      {notifications.length > 0 ? (
        notifications.map((noti) => {
          let count = 0;

          if (noti.readFlag === 0) count++;

          return (
            <div
              className="notification-nowatch-count"
              key={noti.notificationNum}
            >
              {count}
            </div>
          );
        })
      ) : (
        <></>
      )}

      {onNotification ? (
        <ul className="notification-ul" ref={refEl}>
          {notifications.length > 0 ? (
            notifications.map((noti) => {
              return (
                <li
                  className={
                    noti.readFlag === 0
                      ? "notification-li nowatch"
                      : "notification-li"
                  }
                  key={noti.notificationNum}
                >
                  <Link
                    href={noti.url}
                    num={noti.notificationNum}
                    onClick={onChangeFlag}
                  >
                    {(function () {
                      if (noti.notiCategoryNum === 0) {
                        return (
                          <a>
                            <b>'{noti.boardTitle}'</b> 게시물에 댓글이
                            달렸습니다.
                          </a>
                        );
                      } else if (noti.notiCategoryNum === 1) {
                        return (
                          <a>
                            <b>'{noti.boardTitle}'</b> 게시물에 답글이
                            달렸습니다.
                          </a>
                        );
                      }

                      return (
                        <a>
                          <b>'{noti.boardTitle}'</b> 게시물 거래가 완료
                          되었습니다.
                        </a>
                      );
                    })()}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="notification-li nowatch">
              알람이 존재하지 않습니다.
            </li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notification;
