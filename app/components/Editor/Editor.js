import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { BOARD_WRITE_REQUEST } from "../../redux/types";
import axios from "axios";

const Editor = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const { id, isAdmin } = useSelector((state) => state.auth);
  const formData = new FormData();

  const [formValues, setFormValues] = useState({
    studentId: id,
    title: "",
    content: "",
    thumbnail: "",
    price: "",
    categoryName: categoryName,
  });
  const [images, setImages] = useState(null);
  const [imagesName, setImagesName] = useState([]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(formValues);
  };

  const handleImageUpload = (e) => {
    const formData = new FormData();
    const fileImages = e.target.files;
    const imageName = [];
    let imageValidation = false;

    if (Object.keys(fileImages).length > 5) {
      alert("한번에 업로드 하실 수 있는 이미지의 개수는 5개입니다.");
    } else {
      for (let i = 0; i < Object.keys(fileImages).length; i++) {
        if (imagesName.includes(fileImages[i].name)) {
          alert("이미 같은 이름으로 추가 된 이미지 파일이 있습니다.");
          imageValidation = false;
          break;
        } else if (imageName.length > 5) {
          alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
          imageValidation = false;
          break;
        } else {
          if (Object.keys(fileImages).length + imagesName.length > 5) {
            alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
            imageValidation = false;
            break;
          } else {
            imageValidation = true;
            imageName.push(fileImages[i].name);
            setImagesName([...imagesName, ...imageName]);
            formData.append("upload", fileImages[i]);
          }
        }
      }
    }

    if (imageValidation) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/image`, formData)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setImages(response.data.url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBlur = (e) => {
    console.log(images);
    console.log(imagesName);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch({
    //   type: BOARD_WRITE_REQUEST,
    //   payload: formValues,
    // });
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
        <textarea
          className="form-textarea"
          onChange={onChange}
          name="content"
          type="textarea"
          onBlur={handleBlur}
          style={{
            width: "100%",
            height: "500px",
            resize: "none",
          }}
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
          이미지 업로드 Click
        </label>
        <div className="image-name-box">
          {imagesName.map((el, index) => {
            return <p key={index}>{el}</p>;
          })}
        </div>
      </div>

      <div className="post-btn-box">
        <button className="post-write-btn" onClick={onSubmit}>
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
