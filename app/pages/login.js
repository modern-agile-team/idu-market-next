import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { LOGIN_CHECK_REQUEST } from "../redux/types";
import axios from "axios";
import Head from "next/head";

import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();

    const { id, psword } = formValues;
    const body = {
      id,
      psword,
    };
    console.log(body);
    const headers = {
      "api-key": "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/jwt`, body, {
        headers: headers,
      })
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
    <>
      <Head>
        <title>IUAM | 로그인</title>
      </Head>
      <LoginForm
        formValues={formValues}
        onChange={onChange}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default LoginPage;
