import React from "react";
import RatingStars from "../common/RatingStars";
import { BiErrorCircle } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { formatDate } from "../../utils/formdate";
import { GetAvgRating } from "../../utils/avgRating";
import { useEffect, useState } from "react";

const CourseDetails = ({ course }) => {
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.RatingAndReviews);
    setAverageReviewCount(count);
  }, [course]);

  return (
    course && (
      <>
        <div className="flex flex-col gap-4 w-full  sm:w-[60%] mx-auto  md:mx-0 md:w-[60%] mt-[5rem]">
          <img
            src={course?.thumbnail}
            className="w-[100%] mx-auto md:hidden rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
          />
          <h1 className="text-4xl  font-semibold">{course?.courseName}</h1>
          <p className="hidden sm:block text-richblack-300">
            {course?.courseDescription}
          </p>
          <div className=" flex flex-col sm:flex-row gap-1  text-lg">
            <RatingStars
              Review_Count={avgReviewCount}
              Star_Size={24}
              edit={false}
            />
            <p>({course?.RatingAndReviews.length} reviews) </p>
            <p>{course?.studentsEnrolled.length} Students enrolled</p>
          </div>
          <p className="md:text-lg ">
            Create By{" "}
            <span className="text-yellow-100 capitalize">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </span>{" "}
          </p>
          <div className="flex  flex-col md:flex-row gap-3  md:text-lg">
            <div className="flex flex-row items-center  gap-3">
              <BiErrorCircle className="hidden sm:block" />
              Created at {`  ${formatDate(course?.createdAt)}`}
            </div>
            <div className="flex flex-row items-center gap-1">
              <MdLanguage />
              <p>English </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CourseDetails;
