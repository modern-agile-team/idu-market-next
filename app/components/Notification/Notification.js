import React from "react";
import Link from "next/link";
import { IoNotificationsCircleOutline } from "react-icons/io";

const Notification = () => {
  return (
    <div className="header-notification">
      <ul>
        <IoNotificationsCircleOutline />
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
        <Link href="/">
          <li>알림이 도착했습니다.</li>
        </Link>
      </ul>
    </div>
  );
};

export default Notification;
