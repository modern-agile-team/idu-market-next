import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetProfileBoardList = (studentId, url) => {
  const [productList, setProductList] = useState([]);

  const router = useRouter();

  const { authId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authId && studentId) {
      if (authId === studentId) {
        axios
          .get(`${url}/${studentId}`)
          .then((response) => {
            if (response.data.success) {
              const result = response.data.watchLists;
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
  }, [authId, studentId]);

  return { productList };
};
