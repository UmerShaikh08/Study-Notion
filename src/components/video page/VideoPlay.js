import React from "react";
import { markCourseLecture } from "../../services/operations/courseProgress";
import { setCompletedLectures } from "../../Redux/Slices/viewCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import {
  BigPlayButton,
  LoadingSpinner,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  CurrentTimeDisplay,
  TimeDivider,
  ControlBar,
  Player,
} from "video-react";
import "video-react/dist/video-react.css";

const VideoPlay = () => {
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const VideoPlayerRef = useRef();

  const { courseId, sectionId, subsectionId } = useParams();
  const { token } = useSelector((store) => store.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((store) => store.viewCourse);

  useEffect(() => {
    if (!courseSectionData?.length) return;
    const SectionData = courseSectionData?.filter(
      (section) => section?._id === sectionId
    );

    if (!courseId && !sectionId && !subsectionId)
      navigate("/dashboard/enrolled-courses");

    const VideoData = SectionData?.[0]?.subSection?.filter(
      (subsection) => subsection?._id === subsectionId
    );

    setVideoData(VideoData?.[0]);
    setVideoEnded(false);
  }, [courseEntireData, courseSectionData, location.pathname]);

  //  finding index
  const findSectionIdx = () => {
    if (!courseSectionData?.length) return;

    const sectionIdx = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    return sectionIdx;
  };

  const findSubsectionIdx = (sectionIdx) => {
    if (!courseSectionData?.length) return;
    const subSectionIdx = courseSectionData?.[
      sectionIdx
    ]?.subSection?.findIndex((subsection) => subsection?._id === subsectionId);
    return subSectionIdx;
  };

  const firstVideo = () => {
    const sectionIdx = findSectionIdx();
    const subsectionIdx = findSubsectionIdx(sectionIdx);

    if (sectionIdx === 0 && subsectionIdx === 0) return true;
    return false;
  };

  const lastVideo = () => {
    const sectionIdx = findSectionIdx();
    const subsectionIdx = findSubsectionIdx(sectionIdx);

    const sectionLength = courseSectionData?.length;
    const subsectionLength =
      courseSectionData?.[sectionIdx]?.subSection?.length;

    if (
      sectionIdx === sectionLength - 1 &&
      subsectionIdx === subsectionLength - 1
    )
      return true;

    return false;
  };

  const gotoNextVideo = () => {
    const sectionIdx = findSectionIdx();
    const subSectionIdx = findSubsectionIdx(sectionIdx);

    const sectionLength = courseSectionData.length;
    const subsectionLength =
      courseSectionData?.[sectionIdx]?.subSection?.length;

    if (subSectionIdx !== subsectionLength - 1) {
      const nextVideoId =
        courseSectionData?.[sectionIdx]?.subSection[subSectionIdx + 1]?._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextVideoId}`
      );
      return;
    }

    if (sectionIdx !== sectionLength - 1) {
      const nextVideoId = courseSectionData?.[sectionIdx + 1]?._id;

      const nextSubsetionId =
        courseSectionData?.[sectionIdx + 1]?.subSection?.[0]?._id;

      navigate(
        `/view-course/${courseId}/section/${nextVideoId}/sub-section/${nextSubsetionId}`
      );
      return;
    }
  };

  const gotoPrevVideo = () => {
    const sectionIdx = findSectionIdx();
    const subSectionIdx = findSubsectionIdx(sectionIdx);

    if (subSectionIdx !== 0) {
      const prevVideoId =
        courseSectionData[sectionIdx]?.subSection[subSectionIdx - 1]?._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevVideoId}`
      );
      return;
    }

    const subsectionLength =
      courseSectionData?.[sectionIdx - 1]?.subSection?.length;

    if (sectionIdx !== 0) {
      const prevVideoId = courseSectionData?.[sectionIdx - 1]?._id;

      const prevSubsetionId =
        courseSectionData?.[sectionIdx - 1]?.subSection[subsectionLength - 1]
          ?._id;

      navigate(
        `/view-course/${courseId}/section/${prevVideoId}/sub-section/${prevSubsetionId}`
      );
      return;
    }
  };

  const handleCompleteLecture = async () => {
    setLoading(true);
    const result = await markCourseLecture(courseId, subsectionId, token);
    setLoading(false);
    if (result) {
      dispatch(setCompletedLectures(result));
    }
  };

  return (
    <div className="md:w-full w-full overflow-x-hidden">
      {!videoData ? (
        <div>Video Not Found</div>
      ) : (
        <div className="flex flex-col gap-2 mb-8">
          <Player
            ref={VideoPlayerRef}
            className="w-full relative "
            src={videoData.videoUrl}
            aspectRatio="16:9"
            fluid={true}
            autoPlay={false}
            onEnded={() => setVideoEnded(true)}
          >
            <BigPlayButton position="center" />

            <LoadingSpinner />
            <ControlBar>
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
              <ReplayControl seconds={5} order={7.1} />
              <ForwardControl seconds={5} order={7.2} />
              <TimeDivider order={4.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
            </ControlBar>
            {
              <div className="flex justify-center items-center">
                {!firstVideo() && (
                  <div className=" z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5">
                    <BiSkipPreviousCircle
                      onClick={gotoPrevVideo}
                      className=" text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                    />
                    {/* <button onClick={previousLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Previous Lecture</button> */}
                  </div>
                )}
                {!lastVideo() && (
                  <div className=" z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5">
                    <BiSkipNextCircle
                      onClick={gotoNextVideo}
                      className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                    />
                    {/* <button onClick={nextLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next Lecture</button> */}
                  </div>
                )}
                {videoEnded && (
                  <MdOutlineReplayCircleFilled
                    onClick={() => {
                      VideoPlayerRef.current.seek(0);
                      VideoPlayerRef.current.play();
                      setVideoEnded(false);
                    }}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute top-1/2 z-20"
                  />
                )}
                <div className="flex justify-center items-center h-full w-full">
                  {videoEnded &&
                    !completedLectures.includes(videoData?._id) && (
                      <button
                        onClick={() => {
                          handleCompleteLecture();
                        }}
                        disabled={loading}
                        className="bg-yellow-100 text-richblack-900 absolute top-2/3 hover:scale-90 z-20 font-medium md:text-sm px-4 py-2 rounded-md"
                      >
                        Mark as Completed
                      </button>
                    )}
                </div>
              </div>
            }
          </Player>
          <div className="flex flex-col gap-3 text-richblack-5 pl-2">
            <div className="text-xl md:text-2xl font-bold ">
              {videoData?.title}
            </div>
            <div className="text-richblack-200">{videoData?.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlay;
