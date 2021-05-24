import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";

const Notification = ({ studentId }) => {
  const [onNotification, setOnNotification] = useState(false);

  const refEl = useRef(null);

  useEffect(() => {
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

  return (
    <div className="header-notification">
      <IoMdNotifications
        className={
          onNotification ? "notification-icon focus" : "notification-icon"
        }
        onClick={onClick}
      />

      {onNotification ? (
        <ul className="notification-ul" ref={refEl}>
          <li className="notification-li nowatch">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
          <li className="notification-li">
            <Link href="/">
              <a>알림이 도착했습니다.</a>
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notification;
