import React from "react";
import CourseCardInstructor from "./CourseCardInstructor";
import { Link } from "react-router-dom";

const Courses = ({ course }) => {
  return (
    <div className="bg-richblack-800 p-4 rounded-md">
      <div className="flex flex-row justify-between px-3 my-5">
        <h1 className="font-bold text-lg text-richblack-5">Your Courses</h1>
        <Link to={"/dashboard/my-courses"}>
          <button className="text-yellow-50 text-sm">View All</button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 ">
        {course &&
          course
            ?.splice(0, 3)
            ?.map((cour) => (
              <CourseCardInstructor course={cour} key={cour?._id} />
            ))}
      </div>
    </div>
  );
};

export default Courses;
