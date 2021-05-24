import React, { useState } from "react";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";

const Notification = () => {
  const [notification, setNotification] = useState(false);

  return (
    <div className="header-notification">
      <IoMdNotifications
        className={
          notification ? "notification-icon focus" : "notification-icon"
        }
        onClick={() => setNotification(!notification)}
      />

      {notification ? (
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
