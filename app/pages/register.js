import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";

import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    nickname: "",
    email: "",
    psword: "",
    pswordConfirm: "",
    major: "",
  });

  const { jwt } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (jwt) router.push("/");
  }, [jwt]);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectMajor = (e) => {
    setFormValues({
      ...formValues,
      major: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { id, name, nickname, email, psword, pswordConfirm, major } =
      formValues;

    const body = { id, name, nickname, email, psword, pswordConfirm, major };

    if ([id, name, nickname, email, psword, pswordConfirm].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
    } else if (major.length === 0) {
      setErrorMsg("학과를 선택해주세요");
    } else if (id.match(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/) === null) {
      setErrorMsg(
        "첫글자는 숫자를 입력할 수 없으며, 6~12자 제한을 지켜야 합니다."
      );
    } else if (name.match(/^[가-힣]{2,6}$/) === null) {
      setErrorMsg("이름은 공백없이 한글만 입력해주세요 ");
    } else if (nickname.match(/^[a-zA-Z가-힣0-9]{2,10}$/) === null) {
      setErrorMsg("별명은 2~10자리입니다. 모음,자음 따로입력 불가");
    } else if (
      email !== "" &&
      email.match(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ) === null
    ) {
      setErrorMsg("이메일 형식을 유지해주세요.");
    } else if (
      psword.match(
        /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&+=]).*$/
      ) === null
    ) {
      setErrorMsg(
        "비밀번호가 양식(영대소문자, 숫자, 특수문자 조합 9-20자)에 벗어났습니다."
      );
    } else if (psword !== pswordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
    } else {
      const headers = {
        "api-key":
          "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/student`, body, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.success) {
            alert(
              `${name}님 IUAM 회원 가입이 완료 되셨습니다. 로그인 후에 서비스를 이용해주시기 바랍니다.`
            );
            router.push("/login");
          }
        })
        .catch((err) => {
          const response = err.response;
          if (response.status === 409) {
            setErrorMsg(response.data.msg);
          }
        });
    }
  };

  return (
    <>
      <Head>
        <title>IUAM | 회원가입</title>
      </Head>
      <RegisterForm
        formValues={formValues}
        onChange={onChange}
        onSelectMajor={onSelectMajor}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default RegisterPage;
