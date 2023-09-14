import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/Instructor.png";
import RatingStars from "../common/RatingStars";
import { GetAvgRating } from "../../utils/avgRating";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAverageReviewCount] = useState(0);
  useEffect(() => {
    console.log("rating", course?.RatingAndReviews);
    const count = GetAvgRating(course?.RatingAndReviews);
    setAverageReviewCount(count);
  }, [course]);

  return (
    <div className="  lg:w-full rounded-md flex flex-col gap-2 ">
      <img
        src={course?.thumbnail}
        className={` ${Height}  w-full object-cover rounded-md`}
      />
      <h1 className="text-richblack-5 md:text-lg">{course?.courseName}</h1>
      <p className="text-richblack-500">{course?.category.name}</p>
      <div className="text-richblack-5 flex flex-row gap-2">
        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
        <p className="text-richblack-400">
          {" "}
          {course?.RatingAndReviews.length} Ratings
        </p>
      </div>
      <p className="text-richblack-5">{course?.price} Rs</p>
    </div>
  );
};

export default CourseCard;
