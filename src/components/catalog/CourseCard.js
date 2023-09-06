import React from "react";
import logo from "../../assets/Images/Instructor.png";

const CourseCard = ({ course, Height }) => {
  return (
    <div className="  lg:w-full rounded-md flex flex-col gap-2 ">
      <img
        src={course?.thumbnail}
        className={` ${Height}  w-full object-cover rounded-md`}
      />
      <h1 className="text-richblack-5 md:text-lg">{course?.courseName}</h1>
      <p className="text-richblack-500">{course?.category.name}</p>
      <div className="text-richblack-5"> Review Count</div>
      <p className="text-richblack-5">{course?.price}</p>
    </div>
  );
};

export default CourseCard;
