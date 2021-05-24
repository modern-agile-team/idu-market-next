import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { IoMdNotifications } from "react-icons/io";
import {
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_GET_REQUEST,
} from "../../redux/types";

const Notification = ({ studentId, showSidebar }) => {
  const [onNotification, setOnNotification] = useState(false);

  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  const router = useRouter();
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

    router.push(e.target.getAttribute("url"));
  };

  return (
    <div className="header-notification">
      <IoMdNotifications
        className={
          onNotification ? "notification-icon focus" : "notification-icon"
        }
        onClick={onClick}
      />

      <div className="notification-nowatch-count">
        {(function () {
          let count = 0;
          notifications.forEach((el) => {
            if (el.readFlag === 0) count++;
          });

          return count;
        })()}
      </div>

      {onNotification ? (
        <ul className="notification-ul" ref={refEl}>
          {notifications.length > 0 ? (
            notifications.map((noti, index) => {
              return (
                <>
                  {(function () {
                    if (noti.notiCategoryNum === 0) {
                      return (
                        <li
                          className={
                            noti.readFlag === 0
                              ? "notification-li nowatch"
                              : "notification-li"
                          }
                          url={noti.url}
                          num={noti.notificationNum}
                          key={index}
                          onClick={onChangeFlag}
                        >
                          <b>'{noti.boardTitle}'</b> 게시물에 댓글이 달렸습니다.
                        </li>
                      );
                    } else if (noti.notiCategoryNum === 1) {
                      return (
                        <li
                          className={
                            noti.readFlag === 0
                              ? "notification-li nowatch"
                              : "notification-li"
                          }
                          num={noti.notificationNum}
                          url={noti.url}
                          onClick={onChangeFlag}
                          key={index}
                        >
                          <b>'{noti.boardTitle}'</b> 게시물에 댓글이 달렸습니다.
                        </li>
                      );
                    }

                    return (
                      <li
                        className={
                          noti.readFlag === 0
                            ? "notification-li nowatch"
                            : "notification-li"
                        }
                        url={noti.url}
                        num={noti.notificationNum}
                        onClick={onChangeFlag}
                        key={index}
                      >
                        <b>'{noti.boardTitle}'</b> 게시물에 댓글이 달렸습니다.
                      </li>
                    );
                  })()}
                </>
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
