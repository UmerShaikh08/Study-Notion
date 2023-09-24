import React, { useEffect, useState } from "react";
import RatingStars from "../common/RatingStars";
import { GetAvgRating } from "../../utils/avgRating";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.RatingAndReviews);
    setAverageReviewCount(count);
  }, [course]);

  return (
    course && (
      <div className=" z-auto mb-5 md:p-7   lg:w-full    transition-all duration-200  md:hover:scale-105 ">
        <img
          src={course?.thumbnail}
          loading="lazy"
          className={` ${Height}  w-full  rounded-xl object-cover`}
        />
        <h1 className="text-richblack-5 md:text-lg font-semibold">
          {course?.courseName}
        </h1>
        <p className="text-richblack-500">{course?.category?.name}</p>
        <p className="text-richblack-5 ">
          By{" "}
          <span className="text-yellow-100">{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</span>{" "}
        </p>
        <div className="text-richblack-5 flex flex-wrap gap-2">
          <RatingStars Review_Count={avgReviewCount} />
          <p className="text-yellow-50"> {course?.RatingAndReviews?.length}</p>
        </div>
        <p className="text-richblack-5">Rs {course?.price}</p>
      </div>
    )
  );
};

export default CourseCard;
