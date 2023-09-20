import React from "react";

const CourseCardInstructor = ({ course }) => {
  return (
    <div className="flex flex-col gap-1 text-richblack-5 mx-auto">
      <div className="rounded object-cover  ">
        <img
          src={course?.thumbnail}
          alt="course"
          className="rounded object-cover h-[200px] max-w-[200px]  min-w-[200px] lg:max-w-[250px] lg:min-w-[250px] "
        />
      </div>
      <h1>{course?.courseName}</h1>
      <div className="flex flex-row gap-2 text-richblack-100">
        <p>{course?.studentsEnrolled?.length} Students</p>
        <div>|</div>
        <p>₹ {course?.price}</p>
      </div>
    </div>
  );
};

export default CourseCardInstructor;
