import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { BOARD_WRITE_REQUEST } from "../../redux/types";
import SunEditor from "suneditor-react";

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
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(formValues);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleBlur = (e) => {
    const formData = new FormData();
    formData.append("uploadImages", image);

    console.log(image);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch({
    //   type: BOARD_WRITE_REQUEST,
    //   payload: formValues,
    // });
  };

  return (
    <section id="post-write" className="post-write">
      <div className="container">
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

          <input
            type="file"
            name="content"
            multiple
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={handleImageUpload}
          />

          <div className="form-group">
            <textarea
              onChange={onChange}
              name="content"
              type="textarea"
              style={{ resize: "none", width: "80%", height: "1000px" }}
              onBlur={handleBlur}
            />
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
      </div>
    </section>
  );
};

export default Editor;
