import React from "react";
import Head from "next/head";
import BoardBanner from "../../../components/Board/BoardBanner";

const ProfileUpdatePage = () => {
  return (
    <>
      <Head>
        <title>IUAM | 프로필 수정</title>
      </Head>
      <BoardBanner title="IUAM" desc="profile" />
      <section className="profile-update" id="profile-update">
        <div className="container"></div>
      </section>
    </>
  );
};

export default ProfileUpdatePage;
