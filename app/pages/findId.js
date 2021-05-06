import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const FindId = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const router = useRouter();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { name, email } = formValues;
    const body = { name, email };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-id`, body)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.msg);
          router.push("/login");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 400) {
          setErrorMsg(response.data.msg);
        }
      });
  };

  return (
    <>
      <Head>
        <title>IUAM | 아이디 찾기</title>
      </Head>
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
                className={
                  formValues.name ? "input-border fill" : "input-border"
                }
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
              onClick={onSubmitHandler}
              className="form-submit"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default FindId;
