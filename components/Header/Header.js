import React, { useState } from "react";
import Link from "next/link";
import { HeaderMenuData } from "../../Data/HeaderMenuData";
import DropMenu from "./DropMenu";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
        <nav className={sidebar ? "header-nav active" : "header-nav"}>
          <ul className="header-list">
            {HeaderMenuData.map((item, index) => {
              return (
                <DropMenu item={item} key={index} showSidebar={showSidebar} />
              );
            })}
          </ul>

          <>
            <Link href="/login" onClick={() => setSidebar(!sidebar)}>
              <a className="header-btn">로그인</a>
            </Link>

            <Link href="/register" onClick={() => setSidebar(!sidebar)}>
              <a className="header-btn">회원가입</a>
            </Link>
          </>
        </nav>
      </div>
    </header>
  );
};

export default Header;
