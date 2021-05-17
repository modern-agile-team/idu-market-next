import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import BoardBanner from "../../../components/Board/BoardBanner";
import ProfileUpdate from "../../../components/Profile/ProfileUpdate";

const ProfileUpdatePage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    nickname: "",
    majorNum: "",
  });

  const router = useRouter();
  const { studentId } = router.query;

  const profileList = useSelector((state) => state.profile.profile);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id !== studentId) {
      alert("잘못된 접근입니다.");
      router.back();
    } else {
      setFormValues({
        email: profileList.email,
        nickname: profileList.nickname,
        majorNum: "",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>IUAM | 프로필 수정</title>
      </Head>
      <BoardBanner title="IUAM" desc="profile" />
      <section className="profile-update" id="profile-update">
        <div className="container">
          <ProfileUpdate
            profileList={profileList}
            formValues={formValues}
            studentId={studentId}
          />
        </div>
      </section>
    </>
  );
};

export default ProfileUpdatePage;
