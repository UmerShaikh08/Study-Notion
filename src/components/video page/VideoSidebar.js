import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../Dashboard/IconBtn";
import VideoSections from "./VideoSections";

const VideoSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`fixed flex z-30 h-[calc(100vh-3.2rem)] text-richblack-5 transition-transform duration-200 ease-in-out flex-row gap-2  ${
        showSidebar ? "translate-x-[0px]" : "translate-x-[-220px]"
      } `}
    >
      <div className=" flex z-30 h-[calc(100vh-3.2rem)] min-w-[220px] flex-col gap-3 border-r-[1px] border-r-richblack-700 bg-richblack-800  py-10">
        {/*  here i have to write logic */}
        <div className="flex flex-col gap-3">
          <div className="font-semibold">Learn Python 20/20</div>
          <div>
            <IconBtn text={"Add Review "}></IconBtn>
          </div>
          <VideoSections />
        </div>
        <div className="w-[90%] mx-auto border-b-2 border-richblack-700"></div>
      </div>
      <div
        className=" min-h-[1rem] h-fit text-richblack-5 cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <RxCross2 size={30} /> : <BiMenu size={30} />}
      </div>
    </div>
  );
};

export default VideoSidebar;
