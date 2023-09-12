import React, { useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdMonitor } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { convertSecondsToDuration } from "../../utils/secToDuration";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoSections = ({ section }) => {
  const [showLectures, setShowLectures] = useState(false);
  const [duration, setDuration] = useState("");
  const { courseId, sectionId, subsectionId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState("");
  const [videoActiveBar, setVideoActiveBar] = useState("");

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((store) => store.viewCourse);

  const setActiveFlags = () => {
    if (!courseSectionData.length) return;

    const sectionIdx = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const subSectionIdx = courseSectionData[sectionIdx]?.subSection?.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    setActiveStatus(courseSectionData[sectionIdx]?._id);
    setVideoActiveBar(
      courseSectionData[sectionIdx]?.subSection[subSectionIdx]._id
    );
  };

  useEffect(() => {
    setActiveFlags();
  }, [courseEntireData, courseSectionData, location.pathname]);

  useEffect(() => {
    let time = 0;
    section?.subSection?.forEach((subsection) => {
      time += subsection?.timeDuration;
    });

    setDuration(convertSecondsToDuration(time));
  });

  return (
    <div>
      <div className="flex flex-row border-b  overflow-hidden transition-[0.3s] border-richblack-600 justify-between p-1 bg-richblack-700">
        <div className="flex flex-row justify-between items-center w-full text-richblack-100 ">
          <div
            onClick={() => {
              setActiveStatus(section._id);
              setShowLectures(!showLectures);
            }}
            className="flex flex-row items-center gap-1 cursor-pointer "
          >
            {showLectures ? <IoIosArrowDown /> : <IoIosArrowUp />}
            <p>{section?.sectionName}</p>
          </div>
          <p className="text-sm ">{duration}</p>
        </div>
      </div>

      {/* subsections */}
      <div className="relative  bg-richblack-900  ">
        {showLectures &&
          section?.subSection.map((subsection) => (
            <div
              key={subsection._id}
              className={`p-1 flex flex-col  gap-2 w-full ${
                videoActiveBar === subsection._id
                  ? "bg-yellow-50 text-richblack-900"
                  : "bg-black"
              } `}
              onClick={() =>
                navigate(
                  `/view-course/${courseId}/section/${section._id}/sub-section/${subsection._id}`
                )
              }
            >
              <div className="flex  flex-row gap-2 items-center">
                <HiOutlineVideoCamera />
                <div>{subsection?.title}</div>
                <MdMonitor />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoSections;
