import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../Dashboard/IconBtn";
import VideoSections from "./VideoSections";
import { useLocation, useParams } from "react-router-dom";
import AddReviewModal from "./AddReviewModal";

const VideoSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((store) => store.viewCourse);

  console.log("complete lectures ---->", completedLectures);

  return (
    <>
      <div
        className={`fixed flex z-30 h-[calc(100vh-3.2rem)] text-richblack-5 transition-transform duration-200 ease-in-out flex-row gap-2  ${
          showSidebar ? "translate-x-[0px]" : "translate-x-[-220px]"
        } `}
      >
        <div className=" flex z-30 h-[calc(100vh-3.2rem)] min-w-[220px] flex-col gap-3 border-r-[1px] border-r-richblack-700 bg-richblack-800  py-10">
          {/*  here i have to write logic */}
          <div className="flex flex-col gap-3">
            <div className="font-semibold text-lg">
              Learn Python{" "}
              {`${completedLectures.length} / ${totalNoOfLectures}`}
            </div>
            <div onClick={() => setReviewModal(true)}>
              <IconBtn text={"Add Review "}></IconBtn>
            </div>
          </div>
          <div className="w-[90%] mx-auto border-b-2 border-richblack-700"></div>
          {courseSectionData &&
            courseSectionData?.map((section) => (
              <VideoSections section={section} />
            ))}
        </div>
        <div
          className=" min-h-[1rem] h-fit text-richblack-5 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <RxCross2 size={30} /> : <BiMenu size={30} />}
        </div>
      </div>
      {reviewModal && <AddReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default VideoSidebar;
