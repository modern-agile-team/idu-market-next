import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { BOARD_WRITE_REQUEST } from "../../redux/types";
import axios from "axios";
import { modules, formats } from "./EditorConfig";
import EditorImageUpload from "./EditorImageUpload";
import EditorPost from "./EditorPost";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => (
    <p
      style={{
        padding: "80px 0",
        fontSize: "1.5rem",
      }}
    >
      Loading ...
    </p>
  ),
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

  useEffect(() => {
    if (id.length === 0) {
      alert("로그인한 유저만 접근할 수 있습니다.");
      router.back();
    } else {
      if (categoryName === "notice" && isAdmin !== 1) {
        alert("관리자만 접근할 수 있는 페이지 입니다.");
        router.back();
      }
    }
  }, []);

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
            console.log(response.data);
            setUploadImages(uploadImages.concat(response.data.images));
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
        thumbnail: "",
      });
    } else {
      for (let i = 0; i < uploadImages.length; i++) {
        images.push(uploadImages[i]);
      }
      setFormValues({
        ...formValues,
        images: images,
        thumbnail: images[0],
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);
    if (categoryName === "free" || categoryName === "notice") {
      const { studentId, title, content, categoryName } = formValues;

      const body = {
        studentId,
        title,
        content,
        categoryName,
      };

      //유효성 검사
      if (title === "") {
        alert("타이틀을 적어주세요.");
      } else if (content === "") {
        alert("빈 본문입니다.");
      } else {
        dispatch({
          type: BOARD_WRITE_REQUEST,
          payload: body,
        });
        alert("게시글 업로드에 성공하셨습니다.");
        router.push(`/boards/${categoryName}`);
      }
    } else {
      const {
        studentId,
        title,
        content,
        thumbnail,
        price,
        categoryName,
        images,
      } = formValues;

      const body = {
        studentId,
        title,
        content,
        thumbnail,
        price,
        categoryName,
        images,
      };

      //유효성 검사
      if (title === "") {
        alert("타이틀을 적어주세요.");
      }
      /// ^[0-9]+$/: 비어있지 않은 연속된 숫자 문자열
      else if (price.length > 0 && price.match(/^[0-9]+$/) === null) {
        alert("가격을 숫자만 입력해주세요.");
      } else if (price.length >= 8) {
        alert("가격은 9,999,999원 이하로 입력해주세요.");
      } else if (content === "") {
        alert("빈 본문입니다.");
      } else if (images.length === 0) {
        alert("1개 이상의 이미지 업로드를 해주시기 바랍니다.");
      } else {
        dispatch({
          type: BOARD_WRITE_REQUEST,
          payload: body,
        });
        alert("게시글 업로드에 성공하셨습니다.");
        router.push(`/boards/${categoryName}`);
      }
    }
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
        <>
          <div className="form-group">
            <QuillNoSSRWrapper
              name="content"
              modules={modules}
              formats={formats}
              onChange={handleEditor}
            />
          </div>
        </>
      ) : (
        <>
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

          <div className="form-group">
            <QuillNoSSRWrapper
              name="content"
              modules={modules}
              formats={formats}
              onChange={handleEditor}
            />
          </div>

          <EditorImageUpload
            handleImageUpload={handleImageUpload}
            handleDelete={handleDelete}
            uploadImages={uploadImages}
          />
        </>
      )}

      <EditorPost
        onSubmit={onSubmit}
        onMouseDown={onMouseDown}
        categoryName={categoryName}
      />
    </form>
  );
};

export default Editor;
