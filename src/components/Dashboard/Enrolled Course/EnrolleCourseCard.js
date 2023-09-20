import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useOutsideClick from "../../../custom hooks/useOutsideClick";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { removeEnrolledCourse } from "../../../services/operations/profile";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { convertSecondsToDuration } from "../../../utils/secToDuration";

const EnrolleCourseCard = (
  {
    courseName,
    thumbnail,
    courseDescription,
    courseDuration,

    _id,
    getData,
    courseContent,
    progress,
  },
  active
) => {
  const [open, setOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);

  const discription = courseDescription?.substr(0, 50);

  const fetchProgress = async () => {
    const data = progress?.filter((course) => course?.courseId === _id);

    if (data) {
      setCourseProgress(data);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const totalNoOfLectures = () => {
    let total = 0;
    courseContent?.forEach((section) => {
      total += section?.subSection?.length;
    });
    return total;
  };

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
      <div
        className="grid col-span-2 md:col-span-3 cursor-pointer "
        onClick={() =>
          navigate(
            `/view-course/${_id}/section/${courseContent?.[0]?._id}/sub-section/${courseContent?.[0]?.subSection?.[0]}`
          )
        }
      >
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
        {convertSecondsToDuration(courseDuration)}
      </div>
      {/* progress */}
      <div className="grid col-span-2 md:col-span-1 font-semibold my-auto ">
        <p className="text-xs text-richblack-50">
          Progress {(courseProgress?.length / totalNoOfLectures()) * 100 || 0}%
        </p>
        <ProgressBar
          transitionDuration="150"
          completed={(courseProgress?.length / totalNoOfLectures()) * 100 || 0}
          total={totalNoOfLectures()}
          height="8px"
          isLabelVisible={false}
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
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={() =>
                navigate(
                  `/view-course/${_id}/section/${courseContent?.[0]?._id}/sub-section/${courseContent?.[0]?.subSection?.[0]}`
                )
              }
            >
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
