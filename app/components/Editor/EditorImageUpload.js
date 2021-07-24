import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditorImageUpload = ({
  uploadImages,
  handleImageUpload,
  handleDelete,
}) => {
  return (
    <>
      <div className="image-upload-box">
        <label htmlFor="image-upload" className="image-upload-label">
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          이미지 업로드 Click
        </label>

        <div className="image-preview-box">
          {uploadImages &&
            uploadImages.map((image, index) => {
              return (
                <div key={index} className="image-preview">
                  <img src={`${image.url}`} alt="미리보기" />
                  <div
                    className="delete-image-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <p className="limit-desc">이미지 사용 제한: 5MB 이상, GIF 파일</p>
    </>
  );
};

export default EditorImageUpload;
