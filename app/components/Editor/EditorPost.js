import React from "react";
import Link from "next/link";

const EditorPost = ({ onSubmit, onMouseDown, categoryName, num }) => {
  return (
    <div className="post-btn-box">
      <button
        className="post-write-btn"
        onClick={onSubmit}
        onMouseDown={onMouseDown}
      >
        Upload
      </button>
      <Link href={`/boards/${categoryName}/${num}`}>
        <a className="post-cancel-btn">Cancel</a>
      </Link>
    </div>
  );
};

export default EditorPost;
