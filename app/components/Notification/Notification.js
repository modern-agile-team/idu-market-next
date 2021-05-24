import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";

const Notification = ({ studentId }) => {
  const [onNotification, setOnNotification] = useState(false);

  useEffect(() => {}, []);

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
        <ul className="notification-ul">
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
