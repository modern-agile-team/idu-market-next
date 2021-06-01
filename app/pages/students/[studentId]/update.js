import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import BoardBanner from "../../../components/Board/BoardBanner";
import ProfileUpdate from "../../../components/Profile/ProfileUpdate";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const { studentId } = router.query;

  const profileList = useSelector((state) => state.profile.profile);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id !== studentId) {
      alert("잘못된 접근입니다.");
      router.back();
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
          {profileList && (
            <ProfileUpdate profileList={profileList} studentId={studentId} />
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileUpdatePage;
