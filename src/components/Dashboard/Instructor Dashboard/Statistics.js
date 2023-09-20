import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Statistics = ({ course }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let students = 0;
    let price = 0;

    //  countinge students and how many revenue generated
    course?.forEach((data) => {
      students += data?.studentsEnrolled?.length;
      price += data?.studentsEnrolled?.length * data?.price;
    });

    setTotalStudents(students);
    setTotalPrice(price);
  });
  return (
    <div className="bg-richblack-800 p-5 space-y-7  md:w-[30%]">
      <div className="font-semibold text-richblack-5 text-xl">Statistics</div>

      <div className="">
        <p className="text-2xl text-richblack-200">Total Courses</p>
        <p className="text-3xl  text-richblack-50 font-bold">
          {course?.length}
        </p>
      </div>
      <div className="">
        <p className="text-2xl text-richblack-200">Total Students</p>
        <p className="text-3xl text-richblack-50 font-bold">
          {totalStudents}
        </p>{" "}
      </div>
      <div className="">
        <p className="text-2xl text-richblack-200">Total Earnings</p>
        <p className="text-3xl text-richblack-50 font-bold">
          ₹ {totalPrice}
        </p>{" "}
      </div>
    </div>
  );
};

export default Statistics;
