import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseFullDetails } from "../services/operations/courses";
import VideoSidebar from "../components/video page/VideoSidebar";
import AddReviewModal from "../components/video page/AddReviewModal";
import Footer from "./../components/common/Footer";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../Redux/Slices/viewCourseSlice";

const VideoPage = () => {
  const { courseId } = useParams();
  const { token } = useSelector((store) => store.auth);

  const [showSidebar, setShowSidebar] = useState(true);
  const [reviewModal, setReviewModal] = useState(false);

  const dispatch = useDispatch();

  // fetching all course details and lectures
  const fetchCoursDetails = async () => {
    const result = await getCourseFullDetails(courseId, token);

    if (result) {
      //  fetch details in view course slice
      dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(result?.courseDetails));

      let totalLetures = 0;
      result?.courseDetails?.courseContent?.forEach((section) => {
        totalLetures += section?.subSection.length;
      });

      dispatch(setTotalNoOfLectures(totalLetures));
      dispatch(setCompletedLectures(result?.completedVideos));
    }
  };

  useEffect(() => {
    fetchCoursDetails();
  }, []);

  return (
    <div className="relative flex  md:min-h-[calc(100vh-3.5rem)] ">
      {/* sidebar permanant */}
      <VideoSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setReviewModal={setReviewModal}
      />
      <div
        className={` ${
          showSidebar ? "hidden md:block " : "hidden"
        }  w-[240px] max-w-[240px]`}
      ></div>
      <div className=" h-[calc(100vh-3.5rem)] flex-1 overflow-y-auto overflow-x-hidden md:ml-[5rem]">
        <div
          className={`flex   ${
            showSidebar
              ? " md:w-[calc(100vw-320px)]"
              : "w-full md:w-[calc(100vw-320px)] mx-auto"
          } `}
        >
          {/* changing dynamically */}
          <Outlet />
        </div>
        <Footer />
      </div>
      {reviewModal && <AddReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default VideoPage;
