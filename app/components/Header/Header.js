import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { LOGOUT_REQUEST } from "../../redux/types";

import { HeaderMenuData } from "../../Data/HeaderMenuData";
import DropMenu from "./DropMenu";
import Notification from "../Notification/Notification";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const showSidebar = () => setSidebar(!sidebar);

  const onLogoutHandler = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    setSidebar(false);
  };

  return (
    <header id="header" className="header">
      <div className="container">
        <Link href="/">
          <a className="header-title">
            <span>I</span>UAM
          </a>
        </Link>

        <div className="menuToggle">
          {sidebar ? (
            <AiOutlineClose onClick={showSidebar} />
          ) : (
            <FaBars onClick={showSidebar} />
          )}
        </div>

        <div className={sidebar ? "header-nav active" : "header-nav"}>
          <ul className="header-list">
            {HeaderMenuData.map((item, index) => {
              return (
                <DropMenu item={item} key={index} showSidebar={showSidebar} />
              );
            })}
          </ul>

          {auth.jwt ? (
            <>
              <Notification studentId={auth.id} setSidebar={setSidebar} />

              <Link href={`/students/${auth.id}`} className="profile-icon-btn">
                <img
                  src={auth.profilePath}
                  alt="프로필 이미지"
                  className="profile-icon-box"
                  onClick={() => setSidebar(!sidebar)}
                  onerror={"this.src = '/images/profile_error.png'"}
                />
              </Link>

              <Link href="/login">
                <a className="header-btn" onClick={onLogoutHandler}>
                  로그아웃
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="header-btn" onClick={() => setSidebar(false)}>
                  로그인
                </a>
              </Link>

              <Link href="/register">
                <a className="header-btn" onClick={() => setSidebar(false)}>
                  회원가입
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
