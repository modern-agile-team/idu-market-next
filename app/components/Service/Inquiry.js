import axios from "axios";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

const Inquiry = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });

  const { id } = useSelector((state) => state.auth);
  const resetTitle = useRef(null);
  const resetContent = useRef(null);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, content } = formValues;

    const body = {
      studentId: id,
      title,
      content,
    };

    if (body.studentId.length === 0) {
      alert("로그인 후에 서비스를 이용해주시기 바랍니다.");
    } else if (body.title.length === 0) {
      alert("타이틀을 작성해주시기 바랍니다.");
    } else if (body.content.length === 0) {
      alert("본문을 작성해주시기 바랍니다.");
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiry`, body)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            alert("문의 접수가 완료되었습니다.");
          }
        })
        .catch((err) => {
          const response = err.response;
          alert(response.data.msg);
        });

      resetContent.current.value = "";
      resetTitle.current.value = "";

      setFormValues({
        title: "",
        content: "",
      });
    }
  };

  return (
    <>
      <div className="service-inquiry-box">
        <h1 className="service-Inquiry-title">문의사항 접수</h1>
      </div>
      <form className="inquiry-form-group">
        <input
          ref={resetTitle}
          type="text"
          name="title"
          id="title"
          className="write-title"
          onChange={onChange}
          placeholder="Title"
        />
        <span className="post-write-border"></span>
        <textarea
          ref={resetContent}
          type="textarea"
          name="content"
          id="inquiry-content-area"
          className="inquiry-content-area"
          onChange={onChange}
          placeholder="Content"
        />
        <button className="inquiry-write-btn" onClick={onSubmit}>
          문의하기
        </button>
      </form>
      <p className="service-Inquiry-desc">
        우아한 애자일에 문의하실 사항을 작성해서 보내주세요. <br />
        <span>wooahan.agile@gmail.com</span>로 수신 후 해당 학생
        <span>Email</span>로 답변해드리도록 하겠습니다.
      </p>
    </>
  );
};

export default Inquiry;
