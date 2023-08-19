import React from "react";
import ProfileInfo from "./ProfileInfo";
import PassChange from "./PassChange";
import ProfileImg from "./ProfileImg";

const Setting = () => {
  return (
    <div className=" flex flex-col gap-5">
      <ProfileImg />
      <ProfileInfo />
      <PassChange />
    </div>
  );
};

export default Setting;
