import React, { useEffect } from "react";
import VideoSidebar from "../components/video page/VideoSidebar";
import VideoPlay from "../components/video page/VideoPlay";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseFullDetails } from "../services/operations/courses";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../Redux/Slices/viewCourseSlice";

const VideoPage = () => {
  const { courseId } = useParams();
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  console.log(courseId);

  const fetchCoursDetails = async () => {
    //   get full course data
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
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)] ">
      {/* sidebar permanant */}
      <VideoSidebar />
      <div className=" h-[calc(100vh-3.5rem)] flex-1 overflow-auto md:ml-[5rem]">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10  ">
          {/* changing dynamically */}
          <VideoPlay />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
