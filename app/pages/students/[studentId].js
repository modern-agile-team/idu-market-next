import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PROFILE_GET_REQUEST } from "../../redux/types";
import Head from "next/head";

import BoardBanner from "../../components/Board/BoardBanner";
import ProfileImage from "../../components/Profile/ProfileImage";
import ProfileContent from "../../components/Profile/ProfileContent";

const ProfilePage = () => {
  const router = useRouter();
  const { studentId } = router.query;

  const dispatch = useDispatch();
  const profileDetail = useSelector((state) => state.profile.profile);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: PROFILE_GET_REQUEST,
      payload: studentId,
    });
  }, [studentId]);

  return (
    <>
      <Head>
        <title>IUAM | 프로필</title>
      </Head>
      <BoardBanner title="IUAM" desc="profile" />
      <section className="profile" id="profile">
        <div className="container">
          {profileDetail ? (
            <>
              <ProfileImage
                profileDetail={profileDetail}
                studentId={studentId}
              />
              <ProfileContent
                profileDetail={profileDetail}
                authId={id}
                studentId={studentId}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
