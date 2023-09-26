import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getInstructorCourses } from "../../services/operations/courses";
import { useSelector } from "react-redux";
import Statistics from "./Instructor Dashboard/Statistics";
import Courses from "./Instructor Dashboard/Courses";
import PieChart from "./Instructor Dashboard/PieChart";

const InstructorDashboard = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);

  console.log("courses 000", course);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const result = await getInstructorCourses(token);
      setLoading(false);

      if (result) {
        setCourse(result);
        console.log("result --->", result, "length -->", result.length);
      }
    };
    fetchCourse();
    console.log("je");
  }, []);
  return course ? (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold text-richblack-5">
        Hi {user?.firstName} 👋
      </div>
      <div className="text-richblack-200">Let's start something new</div>
      <div className="flex flex-col md:flex-row gap-3">
        <PieChart course={course} />

        <Statistics course={course} />
      </div>

      <Courses course={course} />
    </div>
  ) : (
    <div className="text-richblack-5 text-2xl text-center">Coure Not Found</div>
  );
};

export default InstructorDashboard;
