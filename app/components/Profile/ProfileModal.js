import React from "react";
import { MdCancel } from "react-icons/md";

const ProfileModal = ({ onSelectImage, onModalCancel }) => {
  return (
    <div className="profile-img-modal">
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_1.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_2.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_3.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_4.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_5.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img src="/images/profile_6.png" alt="프로필 이미지 선택" />
      </div>
      <div className="img-modal-top">
        <p className="img-modal-title">
          IUAM
          <span>Select Profile Image</span>
        </p>
        <MdCancel onClick={onModalCancel} className="img-modal-cancel" />
      </div>
    </div>
  );
};

export default ProfileModal;
