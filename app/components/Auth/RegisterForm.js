import React from "react";
import { MajorData } from "../../Data/MajorData";
import Link from "next/link";

const RegisterForm = ({
  formValues,
  onChange,
  onSelectMajor,
  onSubmit,
  errorMsg,
}) => {
  return (
    <>
      <form className="form-field">
        <h1 className="form-title">SignUp</h1>

        <div className="select-field">
          <select
            className="select-major"
            onChange={onSelectMajor}
            defaultalue=""
          >
            {MajorData.map((major) => {
              const { value, majorName } = major;

              return <option value={value}>{majorName}</option>;
            })}
          </select>
        </div>

        <div className="text-field">
          <input
            type="text"
            name="id"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
          />
          <span
            className={formValues.id ? "input-border fill" : "input-border"}
          />
          <label className={formValues.id ? "input-label fix" : "input-label"}>
            학번
          </label>
        </div>

        <div className="text-field">
          <input
            type="text"
            name="name"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
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
            name="nickname"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
          />
          <span
            className={
              formValues.nickname ? "input-border fill" : "input-border"
            }
          />
          <label
            className={formValues.nickname ? "input-label fix" : "input-label"}
          >
            별명
          </label>
        </div>

        <div className="text-field">
          <input
            type="text"
            name="email"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
          />
          <span
            className={formValues.email ? "input-border fill" : "input-border"}
          />
          <label
            className={formValues.email ? "input-label fix" : "input-label"}
          >
            이메일
          </label>
        </div>

        <div className="text-field">
          <input
            type="password"
            name="psword"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
          />
          <span
            className={formValues.psword ? "input-border fill" : "input-border"}
          />
          <label
            className={formValues.psword ? "input-label fix" : "input-label"}
          >
            비밀번호{" "}
            <label className="psword-text">
              (영대소문자, 숫자, 특수문자 포함 9-20자)
            </label>
          </label>
        </div>

        <div className="text-field">
          <input
            type="password"
            name="pswordConfirm"
            onChange={onChange}
            className="input-text"
            autoComplete="off"
          />
          <span
            className={
              formValues.pswordConfirm ? "input-border fill" : "input-border"
            }
          />
          <label
            className={
              formValues.pswordConfirm ? "input-label fix" : "input-label"
            }
          >
            비밀번호 확인
          </label>
        </div>

        <p className="form-errmsg">{errorMsg}</p>

        <input
          type="submit"
          value="SignUp"
          onClick={onSubmit}
          className="form-submit"
        />

        <div className="form-question">
          <p>Do you have an account?</p>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
