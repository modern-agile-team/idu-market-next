import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import FindPwdForm from "../components/Auth/FindPwdForm";

const FindPwdPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    id: "",
    email: "",
  });

  const router = useRouter();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { id, email } = formValues;
    const body = { id, email };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`, body)
      .then((response) => {
        if (response.data.success) {
          alert(response.data.msg);
          router.push("/login");
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        if (response.status === 400) {
          setErrorMsg(response.data.msg);
        }
      });
  };

  return (
    <>
      <Head>
        <title>IUAM | 비밀번호 찾기</title>
      </Head>
      <FindPwdForm
        formValues={formValues}
        onChange={onChange}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default FindPwdPage;
