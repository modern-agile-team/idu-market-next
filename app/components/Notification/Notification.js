import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { IoMdNotifications } from "react-icons/io";
import {
  NOTIFICATION_CHANGE_REQUEST,
  NOTIFICATION_GET_REQUEST,
} from "../../redux/types";
import NotificationItem from "./NotificationItem";

const Notification = ({ studentId }) => {
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

    setOnNotification(false);
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

      {(function () {
        let count = 0;

        notifications.forEach((el) => {
          if (el.readFlag === 0) count++;
        });

        if (count !== 0)
          return <div className="notification-nowatch-count">{count}</div>;

        return <></>;
      })()}

      {onNotification ? (
        <ul className="notification-ul" ref={refEl}>
          {notifications.length > 0 ? (
            notifications.map((noti, index) => {
              return (
                <NotificationItem
                  noti={noti}
                  key={index}
                  onChangeFlag={onChangeFlag}
                />
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
