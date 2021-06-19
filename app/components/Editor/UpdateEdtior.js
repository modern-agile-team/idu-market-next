import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";

import { BOARD_UPDATE_REQUEST, IMAGE_DELETE_REQUEST } from "../../redux/types";
import { modules, formats } from "./EditorConfig";
import EditorImageUpload from "./EditorImageUpload";
import EditorPost from "./EditorPost";
import Loading from "../Loading/Loading";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

const UpdateEditor = ({ categoryName, num, id, board }) => {
  const [formValues, setFormValues] = useState({
    studentId: id,
    title: "",
    content: "",
    images: [],
    thumbnail: "",
    price: "",
    categoryName,
    num,
  });
  const [uploadImages, setUploadImages] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormValues({
      studentId: id,
      title: board.title,
      content: board.content,
      thumbnail: board.thumbnail,
      price: board.price,
      images: board.images,
      categoryName,
      num,
    });
    setUploadImages(board.images);
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
    const body = {
      url: [],
    };

    body.url = [uploadImages[index]];

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
        images,
        thumbnail: images[0],
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (categoryName === "free" || categoryName === "notice") {
      const { studentId, title, content, categoryName, num, images } =
        formValues;

      const body = {
        studentId,
        title,
        content,
        price: "",
        categoryName,
        images,
        num,
      };

      //유효성 검사
      if (title === "") {
        alert("타이틀을 적어주세요.");
      } else if (content === "") {
        alert("빈 본문입니다.");
      } else {
        dispatch({
          type: BOARD_UPDATE_REQUEST,
          payload: body,
        });
        alert("게시글 업데이트에 성공하셨습니다.");
        router.push(`/boards/${categoryName}/${num}`);
      }
    } else {
      let {
        studentId,
        title,
        content,
        thumbnail,
        price,
        categoryName,
        images,
        num,
      } = formValues;

      let body = {
        studentId,
        title,
        content,
        thumbnail,
        price,
        categoryName,
        images,
        num,
      };

      //',' 제거
      while (true) {
        const matcher = price.match(",");

        if (matcher) price = price.replace(",", "");
        else break;

        body = {
          ...body,
          price: price,
        };
      }

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
          type: BOARD_UPDATE_REQUEST,
          payload: body,
        });
        alert("게시글 업데이트에 성공하셨습니다.");
        router.push(`/boards/${categoryName}/${num}`);
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
          defaultValue={board.title}
        />
        <span className="post-write-border"></span>
      </div>

      {categoryName === "free" || categoryName === "notice" ? (
        <></>
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
              defaultValue={board.price}
            />
            <span className="post-write-border"></span>
            <span className="price-won">원 (숫자만 입력)</span>
          </div>
        </>
      )}

      <div className="form-group">
        <QuillNoSSRWrapper
          name="content"
          modules={modules}
          formats={formats}
          onChange={handleEditor}
          defaultValue={board.content}
        />
      </div>

      <EditorImageUpload
        handleImageUpload={handleImageUpload}
        handleDelete={handleDelete}
        uploadImages={uploadImages}
      />

      <EditorPost
        onSubmit={onSubmit}
        onMouseDown={onMouseDown}
        categoryName={categoryName}
        num={num}
      />
    </form>
  );
};

export default UpdateEditor;
