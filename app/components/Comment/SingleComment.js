import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import {
  COMMENT_DELETE_REQUEST,
  COMMENT_GET_REQUEST,
  COMMENT_UPDATE_REQUEST,
  NOTIFICATION_REQUEST,
  REPLY_UPLOAD_REQUEST,
} from "../../redux/types";
import ReplyComment from "./ReplyComment";

const SingleComment = ({ comment, categoryName, num }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const board = useSelector((state) => state.board);

  const { isAdmin } = useSelector((state) => state.auth);

  const [openReply, setOpenReply] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [formValue, setFormValue] = useState({
    content: "",
    studentId: "",
    categoryName,
    num,
    groupNum: comment.groupNum,
  });
  const [updateFormValue, setUpdateFormValue] = useState({
    content: comment.content,
    studentId: auth.id,
    commentNum: comment.num,
    categoryName,
    num,
    groupNum: comment.groupNum,
  });

  const resetValue = useRef(null);

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateChange = (e) => {
    setUpdateFormValue({
      ...updateFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const onOpenReply = () => {
    setOpenReply(!openReply);
    if (openUpdate) {
      setOpenUpdate(false);
    }
  };

  const onOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
    if (openReply) {
      setOpenReply(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { content, categoryName, num, groupNum } = formValue;

    const body = {
      content: content.replace(/(?:\r\n|\r|\n)/g, " <br /> "),
      studentId: auth.id,
      notiCategoryNum: 1,
      senderNickname: auth.nickname,
      recipientNickname: board.nickname,
      url: `https://idu-market.shop/boards/${categoryName}/${num}`,
      categoryName,
      num,
      groupNum,
    };

    if (body.content.length === 0) {
      alert("댓글에 내용을 입력해주세요.");
    } else {
      dispatch({
        type: REPLY_UPLOAD_REQUEST,
        payload: body,
      });

      setTimeout(() => {
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: body,
        });
      }, 100);

      resetValue.current.value = "";

      setFormValue({
        ...formValue,
        content: "",
      });

      setOpenReply(!openReply);
    }
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
      alert("댓글에 수정 할 내용을 입력해주세요.");
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

  const onDelete = (e) => {
    e.preventDefault();

    const body = {
      commentNum: comment.num,
      categoryName,
      num,
      studentId: auth.id,
      depth: comment.depth,
    };
    console.log(body);

    const deleteConfirm = window.confirm("댓글을 삭제하시겠습니까?");

    if (deleteConfirm) {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        payload: body,
      });

      setTimeout(() => {
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: body,
        });
      }, 100);

      setOpenReply(false);
      setOpenUpdate(false);
    }
  };

  return (
    <>
      {comment && comment.depth === 0 ? (
        <>
          <div className="comment-box">
            {comment.hiddenFlag === 1 ? (
              <div className="comment-content">
                <span>숨김 처리 된 댓글입니다.</span>
              </div>
            ) : (
              <>
                <div className="comment-student-id">
                  <img
                    src={comment.profilePath}
                    alt="프로필 이미지"
                    className="comment-profile-img"
                  />
                  <Link href={`/students/${comment.studentId}`}>
                    <a
                      className={
                        comment.nickname.length > 6
                          ? "comment-nickname admin"
                          : "comment-nickname"
                      }
                    >
                      {comment.nickname}
                    </a>
                  </Link>
                </div>
                <div className="comment-content">
                  <span
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></span>
                </div>
                <div className="comment-comment-date">
                  <span>{comment.inDate}</span>
                </div>
                <button onClick={onOpenReply} className="reply-open-btn">
                  reply
                </button>
              </>
            )}

            {auth.id === comment.studentId && comment.hiddenFlag === 0 ? (
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

            {openUpdate ? (
              <div className="comment-submit-box">
                <textarea
                  type="textarea"
                  name="content"
                  id="comment-content-area"
                  className="comment-content-area update"
                  onChange={onUpdateChange}
                  placeholder="Comment"
                  defaultValue={comment.content}
                />

                <button
                  className="comment-submit-btn update"
                  onClick={onUpdate}
                >
                  Update
                </button>
              </div>
            ) : (
              <></>
            )}

            {openReply ? (
              <div className="comment-submit-box">
                {auth.id ? (
                  <>
                    <textarea
                      ref={resetValue}
                      type="textarea"
                      name="content"
                      id="comment-content-area"
                      className="comment-content-area"
                      onChange={onChange}
                      placeholder="Comment"
                    />

                    <button className="comment-submit-btn" onClick={onSubmit}>
                      Submit
                    </button>
                  </>
                ) : (
                  <p className="not-login-comment">
                    로그인 후에 답글을 생성하실 수 있습니다.
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <ReplyComment
          comment={comment}
          categoryName={categoryName}
          num={num}
          onUpdateChange={onUpdateChange}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onOpenUpdate={onOpenUpdate}
        />
      )}
    </>
  );
};

export default SingleComment;
