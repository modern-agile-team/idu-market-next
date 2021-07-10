import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import PwdResetForm from "../../../components/Auth/PwdResetForm";
import BoardBanner from "../../../components/Board/BoardBanner";

const PasswordResetPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    id: "",
    psword: "",
    pswordConfirm: "",
  });

  const router = useRouter();
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

    const { id, psword, pswordConfirm } = formValues;

    if ([id, psword, pswordConfirm].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
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
      const body = {
        id,
        newPsword: psword,
      };
      const headers = {
        "api-key":
          "$2b$10$nyN6CixuxfAV3XOU5yo8DuHYLE9/28UOQF2zpv.SZzITt3WQX8U/C",
      };

      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/api/password`, body, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.success) {
            alert(`비밀번호 변경이 완료되었습니다.`);
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
      <BoardBanner title="IUAM" desc="reset" />
      <PwdResetForm
        formValues={formValues}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </>
  );
};

export default PasswordResetPage;
