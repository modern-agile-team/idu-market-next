import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { BOARD_WRITE_REQUEST } from "../../redux/types";
import axios from "axios";
import { modules, formats } from "./EditorConfig";
import { RiDeleteBin6Line } from "react-icons/ri";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Editor = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const { id, isAdmin } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    studentId: id,
    title: "",
    content: "",
    images: [],
    thumbnail: "",
    price: "",
    categoryName: categoryName,
  });
  const [uploadImages, setUploadImages] = useState([]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditor = (e) => {
    setFormValues({
      ...formValues,
      content: e,
    });
  };

  const handleDelete = (index) => {
    console.log(index);
    setUploadImages(uploadImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    const fileImages = e.target.files;
    let imageValidation = false;

    if (Object.keys(fileImages).length > 5) {
      alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
    } else {
      for (let i = 0; i < Object.keys(fileImages).length; i++) {
        if (Object.keys(fileImages).length + uploadImages.length > 5) {
          alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
          break;
        } else {
          imageValidation = true;
          formData.append("upload", fileImages[i]);
        }
      }
    }

    if (imageValidation) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, formData)
        .then((response) => {
          if (response.data.success) {
            setUploadImages(uploadImages.concat(response.data.images));
            if (uploadImages.length === 0) {
              setFormValues({
                ...formValues,
                thumbnail: response.data.images[0].imageUrl,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();

    const images = [];

    if (uploadImages.length === 0) {
      setFormValues({
        ...formValues,
        images: [],
        thumbnail:
          "https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/thumbNail/communication.png",
      });
    } else {
      for (let i = 0; i < uploadImages.length; i++) {
        images.push(uploadImages[i].imageUrl);
      }

      setFormValues({
        ...formValues,
        images,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch({
    //   type: BOARD_WRITE_REQUEST,
    //   payload: formValues,
    // });

    console.log(formValues);
  };

  return (
    <form className="post-write-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          id="title"
          className="write-title"
          onChange={onChange}
          placeholder="Title"
        />
        <span className="post-write-border"></span>
      </div>

      {categoryName === "free" || categoryName === "notice" ? (
        ""
      ) : (
        <div className="form-group price">
          <input
            type="text"
            name="price"
            id="price"
            className="write-price"
            onChange={onChange}
            placeholder="Price"
          />
          <span className="post-write-border"></span>
          <span className="price-won">원 (숫자만 입력)</span>
        </div>
      )}

      <div className="form-group">
        <QuillNoSSRWrapper
          name="content"
          modules={modules}
          formats={formats}
          onChange={handleEditor}
        />
      </div>

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
          이미지 업로드 CLICK
        </label>

        <div className="image-preview-box">
          {uploadImages &&
            uploadImages.map((el, index) => {
              return (
                <div key={index} className="image-preview">
                  <img src={`${el.imageUrl}`} alt="미리보기" />
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

      <div className="post-btn-box">
        <button
          className="post-write-btn"
          onClick={onSubmit}
          onMouseDown={onMouseDown}
        >
          Upload
        </button>
        <Link href={`/boards/${categoryName}`}>
          <a className="post-cancel-btn">Cancel</a>
        </Link>
      </div>
    </form>
  );
};

export default Editor;
