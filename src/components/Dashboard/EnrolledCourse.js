import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Logo/Logo-Small-Light.png";
import EnrolleCourseCard from "./Enrolled Course/EnrolleCourseCard";
import { getEnrolledCourse } from "../../services/operations/profile";

const EnrolledCourse = () => {
  const [enrolleList, setEnrolleList] = useState([]);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    const data = await dispatch(getEnrolledCourse(token));
    console.log("data-->", data);

    await setEnrolleList(data);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log("enroll ", enrolleList);
  return (
    <div className=" text-richblack-5 flex flex-col gap-4">
      <div className="text-3xl font-inter">
        <h1>Enrolled Courses </h1>
      </div>
      {!enrolleList ? (
        <div className=" text-center text-richblack-5 ">
          You have not enrolled in any course yet.
        </div>
      ) : (
        <>
          <nav className=" bg-richblack-800 w-[25%] rounded-full px-2 py-1  shadow-sm shadow-richblack-500 text-richblack-300 text-sm">
            <ul className="flex flex-row justify-between  mx-auto  ">
              <li>All</li>
              <li>Pending</li>
              <li>Completed</li>
            </ul>
          </nav>

          <div className="flex flex-col ">
            <div className="grid grid-cols-6 text-richblack-50 text-sm  bg-richblack-600 py-2 px-2 rounded-t-md">
              <div className="grid col-span-3">Course Name</div>
              <div className="grid col-span-1">Duration</div>
              <div className="grid col-span-2">Progress</div>
            </div>
            <div className="border-2  border-richblack-600 rounded-b-md flex flex-col ">
              {enrolleList.map((ele, idx) =>
                enrolleList.length === idx + 1 ? (
                  <EnrolleCourseCard active={false} key={ele._id} {...ele} />
                ) : (
                  <EnrolleCourseCard active={false} key={ele._id} {...ele} />
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCourse;
