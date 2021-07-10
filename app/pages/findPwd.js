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

    if ([id, email].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
    } else {
      const headers = {
        "api-key":
          "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`, body, {
          headers: headers,
        })
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
    }
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
