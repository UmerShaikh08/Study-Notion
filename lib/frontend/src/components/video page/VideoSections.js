import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const VideoSections = ({ section, videoActiveBar }) => {
  const { courseId } = useParams();

  const navigate = useNavigate();
  const [sidebar, setShowSidebar] = useState(false);

  const { completedLectures } = useSelector((store) => store.viewCourse);

  // finding an index of ection ans subsectio

  return (
    <details className=" appearance-none text-richblack-5 detailanimatation ">
      <summary className="mt-2 cursor-pointer text-sm text-richblack-5 appearance-none">
        <div className="flex flex-row justify-between bg-richblack-700 md:px-5 py-4">
          <p className="w-[70%] font-semibold">{section?.sectionName}</p>
          <div className="flex flex-row gap-3">
            <div className="flex items-center gap-3">
              <MdOutlineKeyboardArrowDown className="arrow" />
            </div>
          </div>
        </div>
      </summary>
      {section?.subSection.map((subsection, index) => (
        <div
          key={subsection?._id}
          className="transition-[height] duration-500 ease-in-out"
        >
          <div
            onClick={() => {
              setShowSidebar(true);
              navigate(
                `/view-course/${courseId}/section/${section?._id}/sub-section/${subsection?._id}`
              );
            }}
            className={`${
              videoActiveBar === subsection?._id
                ? "bg-yellow-200"
                : "bg-richblack-50"
            } cursor-pointer items-baseline  flex gap-3  px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600 `}
          >
            {/* <input type='checkbox' className=' '/> */}
            <div className="checkbox-wrapper-19 absolute bottom-1">
              <input
                readOnly={true}
                checked={completedLectures?.includes(subsection?._id)}
                type="checkbox"
              />
              <label className="check-box"></label>
            </div>
            <p className=" ml-6">{subsection?.title}</p>
          </div>
        </div>
      ))}
    </details>
  );
};

export default VideoSections;
