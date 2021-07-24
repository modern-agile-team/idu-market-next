import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import FindIdForm from "../components/Auth/FindIdForm";
import { API_KEY } from "../Data/API_KEY";

const FindIdPage = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email } = formValues;
    const body = { name, email };

    if ([name, email].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
    } else {
      const headers = {
        "api-key": API_KEY,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-id`, body, {
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
          if (response.status === 400) {
            setErrorMsg(response.data.msg);
          }
        });
    }
  };

  return (
    <>
      <Head>
        <title>IUAM | 아이디 찾기</title>
      </Head>
      <FindIdForm
        formValues={formValues}
        onSubmit={onSubmit}
        onChange={onChange}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default FindIdPage;
