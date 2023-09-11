import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useReducer } from "react";
import {
  BsThreeDotsVertical,
  BsFillFileEarmarkCheckFill,
} from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import useOutsideClick from "../../../custom hooks/useOutsideClick";
import { removeEnrolledCourse } from "../../../services/operations/profile";
import { useDispatch, useSelector } from "react-redux";

const EnrolleCourseCard = (
  {
    courseName,
    thumbnail,
    courseDescription,
    courseDuration,
    progressPercentage,
    _id,
    getData,
  },
  active
) => {
  const discription = courseDescription?.substr(0, 50);
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useOutsideClick(ref, () => setOpen(false));

  const handleRemove = async () => {
    setLoading(true);
    const result = await dispatch(removeEnrolledCourse(_id, token));

    if (result) {
      getData();
    }
    setLoading(false);
  };

  return (
    <div
      className={`grid grid-cols-6  shadow-sm shadow-richblack-500 place-content-center p-3 pr-0 `}
    >
      {/* img and heading */}
      <div className="grid col-span-2 md:col-span-3 ">
        <div className="flex flex-col md:flex-row gap-3 text md:items-center ">
          <img src={thumbnail} className="w-[45px] h-[45px] rounded-md" />
          <div>
            <div className="text-richblack-25 ">{courseName}</div>
            <div className="text-richblack-300 text-xs hidden md:block">
              {discription}
            </div>
          </div>
        </div>
      </div>

      {/* duration */}
      <div className="grid col-span-1 md:col-span-1  text-richblack-50 my-auto">
        {courseDuration}
      </div>
      {/* progress */}
      <div className="grid col-span-2 md:col-span-1 font-semibold my-auto ">
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

      <div className="relative">
        <BsThreeDotsVertical
          size={25}
          onClick={() => setOpen(true)}
          className=" mx-auto my-auto  text-richblack-500 cursor-pointer"
        />
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={ref}
            className="absolute top-[50%] left-[-45%] bg-richblack-700 rounded-md p-1 p-r0  text-sm flex flex-col  gap-3 transition-all translate-y-[-10px] duration-700 ease-in-out "
          >
            <div className="flex flex-row items-center gap-1 cursor-pointer">
              <BsFillFileEarmarkCheckFill />
              <p>Mark as Completed</p>
            </div>
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={handleRemove}
            >
              <RiDeleteBin6Line />
              <p>Removes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolleCourseCard;
