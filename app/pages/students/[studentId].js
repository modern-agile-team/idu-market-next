import React, { useState, useEffect } from "react";
import BoardBanner from "../../components/Board/BoardBanner";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  return (
    <>
      <BoardBanner title="IUAM" desc="profile" />
      <section className="profile" id="profile">
        <div className="container">
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
          <h1>hi</h1>
        </div>
      </section>
    </>
  );
};

export default Profile;
