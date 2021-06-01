import React from "react";
import Link from "next/link";

const FindIdForm = ({ formValues, onChange, errorMsg, onSubmit }) => {
  return (
    <section id="form-template" className="form-template">
      <div className="container">
        <form className="form-field">
          <h1 className="form-title">Find ID</h1>

          <div className="text-field">
            <input
              type="text"
              name="name"
              onChange={onChange}
              className="input-text"
              autoComplete="on"
            />
            <span
              className={formValues.name ? "input-border fill" : "input-border"}
            />
            <label
              className={formValues.name ? "input-label fix" : "input-label"}
            >
              이름
            </label>
          </div>

          <div className="text-field">
            <input
              type="text"
              name="email"
              onChange={onChange}
              className="input-text"
              autoComplete="on"
            />
            <span
              className={
                formValues.email ? "input-border fill" : "input-border"
              }
            />
            <label
              className={formValues.email ? "input-label fix" : "input-label"}
            >
              이메일
            </label>
          </div>

          <p className="form-errmsg">{errorMsg}</p>

          <div className="form-search">
            <p>
              <Link href="/login">
                <a>로그인</a>
              </Link>
              <span> / </span>
              <Link href="/register">
                <a>회원가입</a>
              </Link>
            </p>
          </div>

          <input
            type="submit"
            value="Find ID"
            onClick={onSubmit}
            className="form-submit"
          />
        </form>
      </div>
    </section>
  );
};

export default FindIdForm;
