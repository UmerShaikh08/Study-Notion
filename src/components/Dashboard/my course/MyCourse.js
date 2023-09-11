import React from "react";
import IconButton from "../IconBtn";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { useEffect } from "react";
import CourseTable from "./CourseTable";
import { useState } from "react";
import { getInstructorCourses } from "../../../services/operations/courses";
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse } from "../../../Redux/Slices/courseSlice";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const fetchInstructorCourses = async () => {
    const result = await getInstructorCourses(token);

    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchInstructorCourses();
  }, []);
  return (
    <div className="text-richblack-5 flex flex-col gap-5 ">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-medium ">My Courses</h1>
        <Link to={"/dashboard/add-course"}>
          <IconButton text={"Add Course"}>
            <BsPlusLg />
          </IconButton>
        </Link>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourse;
