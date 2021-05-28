import React, { useState } from "react";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { COMMENT_GET_REQUEST, COMMENT_UPDATE_REQUEST } from "../../redux/types";

const ReplyComment = ({ comment, categoryName, num, onDelete }) => {
  const auth = useSelector((state) => state.auth);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateFormValue, setUpdateFormValue] = useState({
    content: comment.content,
    studentId: auth.id,
    commentNum: comment.num,
    categoryName,
    num,
    groupNum: comment.groupNum,
  });

  const dispatch = useDispatch();
  const onUpdateChange = (e) => {
    setUpdateFormValue({
      ...updateFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const onOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const { content, categoryName, num, groupNum, commentNum } =
      updateFormValue;

    const body = {
      content: content.replace(/(?:\r\n|\r|\n)/g, " <br /> "),
      studentId: auth.id,
      categoryName,
      commentNum,
      num,
      groupNum,
    };

    if (body.content.length === 0) {
      alert("댓글이 비었습니다.");
    } else {
      dispatch({
        type: COMMENT_UPDATE_REQUEST,
        payload: body,
      });

      setTimeout(() => {
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: body,
        });
      }, 100);
    }

    setOpenUpdate(!openUpdate);
  };

  return (
    <>
      <div className="reply-box">
        <div className="comment-student-id">
          <img
            src={comment.profilePath}
            alt="프로필 이미지"
            className="comment-profile-img"
          />
          <Link href={`/students/${comment.studentId}`}>
            <a
              className={
                comment.isAdmin === 1
                  ? "comment-nickname admin"
                  : "comment-nickname"
              }
            >
              {comment.nickname}
            </a>
          </Link>
        </div>
        <div className="comment-content">
          <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
        </div>
        <div className="comment-comment-date">
          <span>{comment.inDate}</span>
        </div>

        {openUpdate ? (
          <div className="comment-submit-box">
            <textarea
              type="textarea"
              name="content"
              id="comment-content-area"
              className="comment-content-area update"
              onChange={onUpdateChange}
              placeholder="Comment"
              defaultValue={comment.content.replace(/[<]br [/][>]/gi, "\n")}
            />

            <button className="comment-submit-btn update" onClick={onUpdate}>
              Update
            </button>
          </div>
        ) : (
          <></>
        )}

        {auth.id === comment.studentId ? (
          <div className="comment-update-box">
            <button className="comment-update-icon" onClick={onOpenUpdate}>
              <RiPencilLine />
            </button>
            <button className="comment-delete-icon" onClick={onDelete}>
              <RiDeleteBin6Line />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ReplyComment;
