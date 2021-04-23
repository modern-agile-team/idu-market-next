import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

const BoardListTop = () => {
  const router = useRouter();
  const { categoryName } = router.query;

  const [formValues, setFormValues] = useState({
    content: "",
    categoryName,
  });

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Link href={`/boards/${categoryName}/new`}>
        <a className="upload-btn">
          <BiEditAlt className="upload-btn-icon" />
        </a>
      </Link>
      <div className="market-search">
        <input
          type="text"
          name="content"
          className="market-search-input"
          onChange={onChange}
        />
        <span
          className={formValues.content ? "input-border fill" : "input-border"}
        />
        <label
          className={formValues.content ? "input-label fix" : "input-label"}
        >
          Search
        </label>
        <Link
          href={`/boards/${categoryName}/search?content=${formValues.content}`}
          className="markget-search-btn"
        >
          <a className="markget-search-btn">
            <BsSearch className="market-search-icon" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default BoardListTop;
