import React from "react";
import ProfileInfo from "./ProfileInfo";
import PassChange from "./PassChange";
import ProfileImg from "./ProfileImg";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {
  return (
    <div className=" flex flex-col gap-5">
      <ProfileImg />
      <ProfileInfo />
      <PassChange />
      <DeleteAccount />
    </div>
  );
};

export default Setting;
