import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const DropMenu = ({ item, showSidebar }) => {
  const [dropMenu, setDropMenu] = useState(false);
  const refEl = useRef(null);

  const showDropMenu = () => setDropMenu(!dropMenu);

  useEffect(() => {
    const menuClickEvent = (e) => {
      if (refEl.current !== null && !refEl.current.contains(e.target))
        setDropMenu(!dropMenu);
    };

    if (dropMenu) window.addEventListener("click", menuClickEvent);

    return () => window.removeEventListener("click", menuClickEvent);
  }, [dropMenu]);

  return (
    <>
      <li
        className="header-menu"
        onClick={item.subMenu && showDropMenu}
        ref={refEl}
      >
        {item.path ? (
          <Link href={`${item.path}`}>
            <a onClick={showSidebar}>{item.title}</a>
          </Link>
        ) : (
          <>{item.title}</>
        )}
        <ul className="header-menu-drop">
          {dropMenu &&
            item.subMenu.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>
                    <a onClick={showSidebar}>{item.title}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </li>
    </>
  );
};

export default DropMenu;
