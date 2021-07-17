import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//아이콘
import { FaUserAlt, FaGraduationCap } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { MajorData } from "../../Data/MajorData";
import { API_KEY } from "../../Data/API_KEY";

const ProfileUpdate = ({ profileList, studentId }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [changeFormValues, setChangeFormValues] = useState({});

  const router = useRouter();

  useEffect(() => {
    setChangeFormValues({
      email: profileList.email,
      nickname: profileList.nickname,
      majorNum: "",
    });
  }, []);

  const onChange = (e) => {
    setChangeFormValues({
      ...changeFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeMajor = (e) => {
    setChangeFormValues({
      ...changeFormValues,
      majorNum: e.target.value,
    });
  };

  const onUpdateProfile = (e) => {
    e.preventDefault();

    const { email, nickname, majorNum } = changeFormValues;

    let body = {
      studentId,
      email,
      nickname,
      majorNum,
    };

    if ([nickname, email].includes("")) {
      setErrorMsg("빈 칸을 모두 입력하세요.");
    } else if (nickname.match(/^[a-zA-Z가-힣0-9]{2,10}$/) === null) {
      setErrorMsg("별명은 2 ~ 10자리입니다. 모음, 자음 따로입력 불가");
    } else if (
      email !== "" &&
      email.match(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      ) === null
    ) {
      setErrorMsg("이메일 형식을 유지해주세요.");
    } else if (majorNum.length === 0) {
      setErrorMsg("학과를 선택해주세요.");
    } else {
      const headers = { "api-key": API_KEY };

      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`,
          body,
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.success) {
            setErrorMsg("");
            alert("프로필이 수정되었습니다.");
            router.back();
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
    <div className="profile-box">
      {profileList ? (
        <div className="profile-information-box">
          <h1 className="profile-update-title">프로필 수정</h1>
          <p className="profile-information">
            <span>
              <FaUserAlt />
            </span>
            {profileList.name}
          </p>

          <p className="profile-information">
            <span>
              <FaUserAlt />
            </span>
            <input
              type="text"
              name="nickname"
              className="update-profile"
              autoComplete="off"
              onChange={onChange}
              defaultValue={profileList.nickname}
            />
          </p>

          <p className="profile-information">
            <span>
              <MdEmail />
            </span>
            <input
              type="text"
              name="email"
              className="update-profile"
              autoComplete="off"
              onChange={onChange}
              defaultValue={profileList.email}
            />
          </p>

          <div className="profile-information">
            <span>
              <FaGraduationCap />
            </span>
            <select
              className="update-major"
              onChange={onChangeMajor}
              defaultalue=""
            >
              {MajorData.map((major, index) => {
                const { value, majorName } = major;

                return (
                  <option value={value} key={index}>
                    {majorName}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="update-errmsg">{errorMsg}</p>
          <button className="update-btn" onClick={onUpdateProfile}>
            UPDATE
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileUpdate;
