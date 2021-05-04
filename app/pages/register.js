import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";

const Register = () => {
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

  const onHandlerSelect = (e) => {
    setFormValues({
      ...formValues,
      major: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const {
      id,
      name,
      nickname,
      email,
      psword,
      pswordConfirm,
      major,
    } = formValues;

    const body = { id, name, nickname, email, psword, pswordConfirm, major };

    if ([id, name, nickname, email, psword, pswordConfirm].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
    } else if (major.length === 0) {
      setErrorMsg("학과를 선택해주세요");
    } else if (id.match(/^[1-2][0|9][0-9]{7}$/) === null) {
      setErrorMsg("학번은 숫자 9자리만 입력가능합니다.");
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
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/student`, body)
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
      <section id="form-template" className="form-template">
        <div className="container">
          <form className="form-field">
            <h1 className="form-title">SignUp</h1>

            <div className="select-field">
              <select
                className="select-major"
                onChange={onHandlerSelect}
                defaultalue=""
              >
                <option value="">학과 선택 </option>
                <option value="1">비서학과</option>
                <option value="2">관광서비스경영학과</option>
                <option value="3">휴먼사회복지학과</option>
                <option value="4">비지니스영어과</option>
                <option value="5">비즈니스중국어과</option>
                <option value="6">비즈니스일본어과</option>
                <option value="7">세무회계학과</option>
                <option value="8">글로벌항공서비스학과</option>
                <option value="9">건축학과</option>
                <option value="10">토목공학과</option>
                <option value="11">실내건축과</option>
                <option value="12">디지털산업디자인학과</option>
                <option value="13">시각디자인과</option>
                <option value="14">주얼리디자인학과</option>
                <option value="15">멀티미디어디자인학과</option>
                <option value="16">정보통신공학과</option>
                <option value="17">리빙세라믹디자인학과</option>
                <option value="18">게임/vr디자인학과</option>
                <option value="19">방송영상미디어학과</option>
                <option value="20">방송뷰티학과</option>
                <option value="21">기계자동화학과</option>
                <option value="22">컴퓨터전자공학과</option>
                <option value="23">산업경영공학과</option>
                <option value="24">컴퓨터소프트웨어학과</option>
                <option value="25">메카트로닉스공학과</option>
                <option value="26">융합기계공학과</option>
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
              <label
                className={formValues.id ? "input-label fix" : "input-label"}
              >
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
                className={
                  formValues.nickname ? "input-label fix" : "input-label"
                }
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
                className={
                  formValues.psword ? "input-label fix" : "input-label"
                }
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
                  formValues.pswordConfirm
                    ? "input-border fill"
                    : "input-border"
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
              onClick={onSubmitHandler}
              className="form-submit"
            />

            <div className="form-question">
              <p>Do you have an account?</p>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
