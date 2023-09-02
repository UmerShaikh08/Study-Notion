import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

const EnrolleCourseCard = (
  {
    courseName,
    thumbnail,
    courseDescription,
    courseDuration,
    progressPercentage,
  },
  active
) => {
  const discription = courseDescription?.substr(0, 50);

  return (
    <div
      className={`grid grid-cols-6  shadow-sm shadow-richblack-500 place-content-center p-3 `}
    >
      {/* img and heading */}
      <div className="grid col-span-3 ">
        <div className="flex flex-row gap-3 text items-center ">
          <img src={thumbnail} className="w-[45px] h-[45px] rounded-md" />
          <div>
            <div className="text-richblack-25 ">{courseName}</div>
            <div className="text-richblack-300 text-xs">{discription}</div>
          </div>
        </div>
      </div>

      {/* duration */}
      <div className="grid col-span-1 text-richblack-50 my-auto">
        {courseDuration}
      </div>
      {/* progress */}
      <div className="grid col-span-1 font-semibold my-auto ">
        <p className="text-xs text-richblack-50">
          Progress {progressPercentage || 50}%
        </p>
        <ProgressBar
          completed={progressPercentage || 50}
          bgColor="#47A5C5"
          height="8px"
          borderRadius="0px"
          isLabelVisible={false}
          baseBgColor="#2C333F"
          labelColor="#e80909"
          margin="0"
          padding="0"
          transitionDuration="150"
          maxCompleted={100}
          barContainerClassName="container"
        />
      </div>
    </div>
  );
};

export default EnrolleCourseCard;
