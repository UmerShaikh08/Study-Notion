import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../Dashboard/IconBtn";
import VideoSections from "./VideoSections";
import AddReviewModal from "./AddReviewModal";
import useGetIndex from "./useGetIndex";

const VideoSidebar = ({ showSidebar, setShowSidebar }) => {
  const [reviewModal, setReviewModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActiveBar, setVideoActiveBar] = useState("");

  const location = useLocation();
  const { getIdx } = useGetIndex();
  const { sectionId, subsectionId } = useParams();

  //  getting all data from view course slice
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((store) => store.viewCourse);

  useEffect(() => {
    getIdx(
      courseSectionData,
      sectionId,
      subsectionId,
      setActiveStatus,
      setVideoActiveBar
    );
  }, [courseEntireData, courseSectionData, location.pathname]);

  return (
    <>
      <div
        className={`fixed flex flex-row z-30 h-[calc(100vh-3.7rem)] w-[220px]  md:w-[320px] max-w-[350px]  text-richblack-5 transition-transform duration-200 ease-in-out  gap-1  ${
          showSidebar
            ? "translate-x-[0px]"
            : " translate-x-[-220px] md:translate-x-[-320px]"
        } `}
      >
        <div className="  transition-all duration-700 z-20 relative offSidebar1">
          <div className=" transition-all origin-right duration-500 flex h-[calc(100vh-3.5rem)] w-[220px]  md:w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 offSidebar2">
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
            <div className="<div className='h-[calc(100vh - 5rem)] overflow-y-auto px-2"></div>
            {courseSectionData &&
              courseSectionData?.map((section) => (
                <VideoSections
                  section={section}
                  activeStatus={activeStatus}
                  videoActiveBar={videoActiveBar}
                  setActiveStatus={setActiveStatus}
                  setVideoActiveBar={setVideoActiveBar}
                />
              ))}
          </div>
        </div>
        <div
          className=" min-h-[1rem] h-fit text-richblack-5 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <abbr title="Close Lecture Section">
              <RxCross2 size={30} />
            </abbr>
          ) : (
            <abbr title="Open Lecture Section">
              {" "}
              <BiMenu size={30} />
            </abbr>
          )}
        </div>
      </div>
      {reviewModal && <AddReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default VideoSidebar;
