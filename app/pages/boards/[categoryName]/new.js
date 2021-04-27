import React from "react";
import { useRouter } from "next/router";
import BoardBanner from "../../../components/Board/BoardBanner";
import dynamic from "next/dynamic";

const New = () => {
  const router = useRouter();

  const EditorComponent = dynamic(
    () => import("../../../components/Editor/Editor"),
    {
      ssr: false,
    }
  );

  return (
    <>
      <BoardBanner title="Market" desc="book" />
      <EditorComponent />
    </>
  );
};

export default New;
