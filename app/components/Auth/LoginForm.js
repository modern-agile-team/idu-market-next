import React from "react";
import Link from "next/link";

const LoginForm = ({ formValues, onChange, errorMsg, onSubmit }) => {
  return (
    <section id="form-template" className="form-template">
      <div className="container">
        <form className="form-field">
          <h1 className="form-title">LOGIN</h1>

          <div className="text-field">
            <input
              type="text"
              name="id"
              onChange={onChange}
              className="input-text"
              autoComplete="on"
            />
            <span
              className={formValues.id ? "input-border fill" : "input-border"}
            />
            <label
              className={formValues.id ? "input-label fix" : "input-label"}
            >
              아이디
            </label>
          </div>

          <div className="text-field">
            <input
              type="password"
              name="psword"
              onChange={onChange}
              className="input-text"
              autoComplete="on"
            />
            <span
              className={
                formValues.psword ? "input-border fill" : "input-border"
              }
            />
            <label
              className={formValues.psword ? "input-label fix" : "input-label"}
            >
              비밀번호
            </label>
          </div>

          <p className="form-errmsg">{errorMsg}</p>

          <div className="form-search">
            <p>
              <Link href="/findId">
                <a>아이디</a>
              </Link>
              <span> / </span>
              <Link href="/findPwd">
                <a>비밀번호</a>
              </Link>
              <span>찾기</span>
            </p>
          </div>

          <input
            type="submit"
            value="Login"
            onClick={onSubmit}
            className="form-submit"
          />

          <div className="form-signup-link">
            Not a Member?{" "}
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
