import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { formatDate } from "../../services/formdate";

const CourseDetails = ({ course }) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full  sm:w-[60%] mx-auto  md:mx-0 md:w-[60%] mt-[5rem]">
        <img
          src={course?.thumbnail}
          className="w-[100%]  md:hidden rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
        />
        <h1 className="text-4xl  font-semibold">{course?.courseName}</h1>
        <p className="hidden sm:block text-richblack-300">
          {course?.courseDescription}
        </p>
        <p className="">
          ({course?.RatingAndReviews.length} reviews){" "}
          {course?.studentsEnrolled.length} Students enrolled
        </p>
        <p className="md:text-lg">
          Create By {course?.instructor.firstName} {course?.instructor.lastName}{" "}
        </p>
        <div className="flex  flex-col md:flex-row gap-3  md:text-lg">
          <div className="flex flex-row items-center  gap-3">
            <BiErrorCircle className="hidden sm:block" />
            <p className=""> Created at </p>
            {formatDate(course?.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">
            <MdLanguage />
            <p>English </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
