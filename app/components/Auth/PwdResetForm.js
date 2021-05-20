import React from "react";

const PwdResetForm = ({ formValues, errorMsg, onSubmit, onChange }) => {
  return (
    <section id="form-template" className="form-template">
      <div className="container">
        <form className="form-field">
          <h1 className="form-title">Reset Password</h1>
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
            <label
              className={formValues.id ? "input-label fix" : "input-label"}
            >
              학번
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
              className={
                formValues.psword ? "input-border fill" : "input-border"
              }
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
            value="Reset Password"
            onClick={onSubmit}
            className="form-submit"
          />
        </form>
      </div>
    </section>
  );
};

export default PwdResetForm;
