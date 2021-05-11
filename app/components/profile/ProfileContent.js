import React, { useState } from "react";
import Link from "next/link";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoIosHeart,
  IoIosListBox,
} from "react-icons/io";
import { FaUserAlt, FaGraduationCap } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiPencil } from "react-icons/bi";

const ProfileContent = ({ authId, studentId, profileDetail }) => {
  const [openBtnBox, setOpenBtnBox] = useState(false);

  return (
    <>
      {authId === studentId ? (
        <>
          <p className="profile-id">{profileDetail.id}</p>

          <div className="profile-information-box">
            <p className="profile-information">
              <span>
                <FaUserAlt />
              </span>
              {profileDetail.name}
            </p>
            <p className="profile-information">
              <span>
                <FaUserAlt />
              </span>
              {profileDetail.nickname}
            </p>
            <p className="profile-information">
              <span>
                <MdEmail />
              </span>
              {profileDetail.email}
            </p>
            <p className="profile-information">
              <span>
                <FaGraduationCap />
              </span>
              {profileDetail.major}
            </p>

            <Link href={`/students/${studentId}/update`}>
              <a className="profile-update-btn">프로필 수정</a>
            </Link>

            {openBtnBox ? (
              <IoIosArrowDropupCircle
                className="open-profile-btn"
                onClick={() => setOpenBtnBox(!openBtnBox)}
              />
            ) : (
              <IoIosArrowDropdownCircle
                className="open-profile-btn"
                onClick={() => setOpenBtnBox(!openBtnBox)}
              />
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ProfileContent;
