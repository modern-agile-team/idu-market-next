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
        <div className="profile-information-box">
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
        </div>
      )}

      {openBtnBox ? (
        <div className="profile-btn-box">
          <p>
            <Link href={`/watchlist/${studentId}`}>
              <a>
                <span>
                  <IoIosHeart />
                </span>
                관심목록
              </a>
            </Link>
          </p>
          <p>
            <Link href={`/sale-list/${studentId}`}>
              <a>
                <span>
                  <IoIosListBox />
                </span>
                판매목록
              </a>
            </Link>
          </p>
          <p>
            <Link href={`/purchase-list/${studentId}`}>
              <a>
                <span>
                  <IoIosListBox />
                </span>
                구매목록
              </a>
            </Link>
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default ProfileContent;
