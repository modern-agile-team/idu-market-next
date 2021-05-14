import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPencil } from "react-icons/bi";
import { PROFILE_IMAGE_UPDATE_REQUEST } from "../../redux/types";
import ProfileModal from "./ProfileModal";

const ProfileImage = ({ profileDetail, studentId }) => {
  const [openImgSelectModal, setOpenImgSelectModal] = useState(false);

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  const onSelectImage = (e) => {
    const body = {
      studentId,
      profilePath: e.target.src,
    };

    dispatch({
      type: PROFILE_IMAGE_UPDATE_REQUEST,
      payload: body,
    });

    setOpenImgSelectModal(false);
  };

  return (
    <div className="profile-img-box">
      <img src={profileDetail.profilePath} alt="test" className="profile-img" />

      {id === studentId ? (
        <BiPencil
          className="profile-img-update"
          onClick={() => setOpenImgSelectModal(true)}
        />
      ) : (
        <></>
      )}

      {openImgSelectModal ? (
        <ProfileModal
          onSelectImage={onSelectImage}
          onModalCancel={() => setOpenImgSelectModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileImage;
