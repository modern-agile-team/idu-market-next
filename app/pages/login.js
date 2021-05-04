import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { LOGIN_CHECK_REQUEST } from "../redux/types";
import axios from "axios";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    id: "",
    psword: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);

  useEffect(() => {
    if (jwt) router.push("/");
  }, [jwt]);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { id, psword } = formValues;
    const body = { id, psword };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/jwt`, body)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("jwt", response.data.jwt);
          dispatch({
            type: LOGIN_CHECK_REQUEST,
            payload: localStorage.getItem("jwt"),
          });
          router.push("/");
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
              학번
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
            onClick={onSubmitHandler}
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

export default Login;
