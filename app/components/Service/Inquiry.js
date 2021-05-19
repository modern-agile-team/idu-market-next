import React from "react";

const Inquiry = () => {
  return (
    <>
      <div className="service-inquiry-box">
        <h1 className="service-Inquiry-title">문의사항 접수</h1>
      </div>
      <form className="inquiry-form-group">
        <input
          type="text"
          name="title"
          id="title"
          className="write-title"
          // onChange={onChange}
          placeholder="Title"
        />
        <span className="post-write-border"></span>
        <textarea
          // ref={resetValue}
          type="textarea"
          name="content"
          id="inquiry-content-area"
          className="inquiry-content-area"
          // onChange={onChange}
          placeholder="Content"
        />
        <button
          className="inquiry-write-btn"
          // onClick={onSubmit}
          // onMouseDown={onMouseDown}
        >
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
