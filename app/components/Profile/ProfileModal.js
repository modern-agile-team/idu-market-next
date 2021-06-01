import React from "react";
import { MdCancel } from "react-icons/md";

const ProfileModal = ({ onSelectImage, onModalCancel }) => {
  return (
    <div className="profile-img-modal">
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/1.png"
          alt="프로필 이미지 선택"
        />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/2.png"
          alt="프로필 이미지 선택"
        />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/3.png"
          alt="프로필 이미지 선택"
        />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/4.png"
          alt="프로필 이미지 선택"
        />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/5.png"
          alt="프로필 이미지 선택"
        />
      </div>
      <div className="img-select-box" onClick={onSelectImage}>
        <img
          src="https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/6.png"
          alt="프로필 이미지 선택"
        />
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
