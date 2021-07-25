import React, { useRef } from "react";
import { SiNotion } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  const ref = useRef();
  const onWheel = (e) => {
    const pageScrollY = window.scrollY;
    if (e.deltaY < 100) {
      window.scrollTo({ top: pageScrollY - ref.current.clientHeight });
    }
  };

  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <section ref={ref} onWheel={onWheel} id="footer" className="footer">
      <div className="container">
        <Link href="/">
          <a className="footer-title">
            <span>I</span>UAM
          </a>
        </Link>
        <p className="copyright">
          Copyright &copy; <span className="footer-year">{thisYear()}</span>{" "}
          <span className="footer-wooahan">Wooahan Agile</span> All right
          reserved.
        </p>
        <div className="footer-icons">
          <button
            onClick={() =>
              window.open(
                "https://www.notion.so/e30b5df25a044809823784f0fee40686",
                "_blank"
              )
            }
            className="footer-tooltip"
            data-tooltips="Wooahan Agile Notion"
          >
            <p className="ir_su">Notion icon</p>
            <SiNotion className="footer-icon-notion" />
          </button>
          <button
            onClick={() =>
              window.open("https://www.induk.ac.kr/KR/index.do", "_blank")
            }
            data-tooltips="Induk University"
            className="footer-tooltip"
          >
            <div className="footer-icon-idu" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
