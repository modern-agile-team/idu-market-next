import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";

import { modules, formats } from "./EditorConfig";
import EditorImageUpload from "./EditorImageUpload";
import EditorPost from "./EditorPost";
import Loading from "../Loading/Loading";
import { IMAGE_DELETE_REQUEST } from "../../redux/types";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

const Editor = ({ categoryName }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { id, isAdmin } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    studentId: id,
    title: "",
    content: "",
    images: [],
    thumbnail: "",
    price: "",
    categoryName: "",
  });
  const [uploadImages, setUploadImages] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      alert("로그인한 유저만 접근할 수 있습니다.");
      router.back();
    } else {
      setFormValues({
        ...formValues,
        studentId: id,
        categoryName,
      });

      if (categoryName === "notice" && isAdmin !== 1) {
        alert("관리자만 접근할 수 있는 페이지 입니다.");
        router.back();
      }
    }
  }, [categoryName, id]);

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
    const body = {
      url: [],
    };

    body.url = [uploadImages[index].url];

    dispatch({
      type: IMAGE_DELETE_REQUEST,
      payload: body,
    });
    setUploadImages(uploadImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    const fileImages = e.target.files;
    let imageValidation = false;

    formData.append(
      "params",
      JSON.stringify({
        basepath: "/boards",
        autorename: true,
      })
    );

    if (Object.keys(fileImages).length > 5) {
      alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
    } else {
      for (let i = 0; i < Object.keys(fileImages).length; i++) {
        if (Object.keys(fileImages).length + uploadImages.length > 5) {
          alert("업로드 하실 수 있는 이미지의 최대 개수는 5개입니다.");
          break;
        } else {
          imageValidation = true;
          formData.append("files", fileImages[i]);
        }
      }
    }

    if (imageValidation) {
      const headers = {
        Authorization: process.env.NEXT_PUBLIC_IMAGE_SECRET_KEY,
      };

      await axios
        .post(
          `https://api-image.cloud.toast.com/image/v2.0/appkeys/${process.env.NEXT_PUBLIC_IMAGE_KEY}/images`,
          formData,
          { headers: headers }
        )
        .then((response) => {
          console.log(response);
          if (response.data.header.isSuccessful) {
            response.data.successes.forEach((el) => {
              const data = {
                id: el.id,
                url: el.url,
              };
              setUploadImages((prev) => [...prev, data]);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();

    let images = [];

    if (uploadImages.length === 0) {
      setFormValues({
        ...formValues,
        images: [],
        thumbnail: "",
      });
    } else {
      for (let i = 0; i < uploadImages.length; i++) {
        images = [
          ...images,
          {
            id: uploadImages[i].id,
            url: uploadImages[i].url,
          },
        ];
      }
      setFormValues({
        ...formValues,
        images: images,
        thumbnail: images[0].url,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (categoryName === "free" || categoryName === "notice") {
      const { studentId, title, content, categoryName, images } = formValues;

      const body = {
        studentId,
        title,
        content,
        categoryName,
        images,
      };

      //유효성 검사
      if (title === "") {
        alert("타이틀을 적어주세요.");
      } else if (content === "") {
        alert("빈 본문입니다.");
      } else {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`,
            body
          )
          .then((response) => {
            if (response.data.success) {
              alert("게시글 업로드에 성공하셨습니다.");
              router.push(`/boards/${categoryName}/${response.data.num}`);
            }
          })
          .catch((err) => {
            const response = err.response;
            console.log(response.data.msg);
          });
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

      console.log(body);
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
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`,
            body
          )
          .then((response) => {
            if (response.data.success) {
              alert("게시글 업로드에 성공하셨습니다.");
              router.push(`/boards/${categoryName}/${response.data.num}`);
            }
          })
          .catch((err) => {
            const response = err.response;
            console.log(response.data.msg);
          });
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

          <EditorImageUpload
            handleImageUpload={handleImageUpload}
            handleDelete={handleDelete}
            uploadImages={uploadImages}
          />
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
