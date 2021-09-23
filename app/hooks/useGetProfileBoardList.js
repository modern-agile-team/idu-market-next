import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

export const useGetProfileBoardList = (studentId, url, type) => {
  const [productList, setProductList] = useState([]);
  const { id } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (id && studentId) {
      if (id === studentId) {
        axios
          .get(`${url}/${studentId}`)
          .then((response) => {
            if (response.data.success) {
              let result = [];

              if (type === "watch") result = response.data.watchLists;
              else if (type === "sales") result = response.data.saleLists;
              else if (type === "purchase") result = response.data.purchaseList;

              setProductList(result);
            }
          })
          .catch((err) => {
            const response = err.response;
            console.log(response.data.msg);
          });
      } else {
        alert("잘못된 접근입니다.");
        router.back();
      }
    }
  }, [id, studentId]);

  return { productList };
};
