import React, { useEffect, useState } from "react";
import RatingStars from "../common/RatingStars";
import { GetAvgRating } from "../../utils/avgRating";
import CourseCardShimmer from "../shimmer/CourseCardShimmer";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.RatingAndReviews);
    console.log(course);
    setAverageReviewCount(count);
  }, [course]);

  return (
    course && (
      <div className="  lg:w-full rounded-md flex flex-col gap-2n transition-all duration-200  hover:scale-105 ">
        <img
          src={course?.thumbnail}
          className={` ${Height}  w-full object-cover rounded-md`}
        />
        <h1 className="text-richblack-5 md:text-lg">{course?.courseName}</h1>
        <p className="text-richblack-500">{course?.category?.name}</p>
        <p className="text-richblack-5 ">
          By{" "}
          <span className="text-yellow-100">{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</span>{" "}
        </p>
        <div className="text-richblack-5 flex flex-row gap-2">
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          <p className="text-richblack-400">
            {" "}
            {course?.RatingAndReviews?.length} Ratings
          </p>
        </div>
        <p className="text-richblack-5">{course?.price} Rs</p>
      </div>
    )
  );
};

export default CourseCard;
