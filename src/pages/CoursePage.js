import React from "react";
import Footer from "../components/common/Footer";
import Section from "../components/course/Section";
import CourseBuyCard from "../components/course/CourseBuyCard";
import CourseDetails from "../components/course/CourseDetails";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCourseDetails } from "../services/operations/courses";
import { convertSecondsToDuration } from "../utils/secToDuration";
import BuyCardShimmer from "../components/shimmer/BuyCardShimmer";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [courseDuration, setCourseDuration] = useState("");
  const [shimmer, setShimmer] = useState(true);

  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);

  const fetchCourse = async () => {
    console.log("i called cours details fuction");
    const result = await getCourseDetails(id, token);

    if (result) {
      setCourse(result);
    }
  };

  useEffect(() => {
    fetchCourse();

    setTimeout(() => {
      setShimmer(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let lectures = 0;
    setCourseDuration(convertSecondsToDuration(course?.courseDuration));

    //  calculate the count of lectures
    course?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    });

    setTotalNoOfLectures(lectures);
  }, [course]);

  return (
    course && (
      <div className="bg-richblack-900 w-full text-richblack-5">
        {/* section 1 */}
        <section className="bg-richblack-800 w-full pt-[4rem] mb-[5rem] pb-[5rem]">
          <div className="w-11/12 mx-auto max-w-maxContent  md:ml-auto ">
            <div className=" flex flex-col md:flex-row relative w-full gap-5 justify-between">
              {/* details of course */}
              <CourseDetails course={course} />

              {/* buy course card */}
              {!shimmer && course ? (
                <CourseBuyCard course={course} />
              ) : (
                <BuyCardShimmer />
              )}
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="mb-6 mx-auto">
          <div className="w-11/12 ml-1 md:mx-auto max-w-maxContent flex flex-col gap-4 ">
            {/* what you will learn */}
            <div className=" border border-richblack-700 py-10 px-4 mx-auto md:mx-0 w-full  sm:w-[80%]  md:w-[60%] flex flex-col gap-4">
              <h1 className="text-4xl font-semibold">What you'll learn</h1>
              <p className="">{course?.whatYouWillLearn}</p>
            </div>

            {/* Course Content */}
            <div className="flex flex-col mt-4 gap-4  w-full  sm:w-[80%]  md:w-[60%] mx-auto md:mx-0">
              <h1 className="text-4xl font-sembold">Course Content</h1>

              <div className="flex flex-col md:flex-row  gap-2">
                <p>{course?.courseContent?.length} section(s)</p>
                <p>{totalNoOfLectures} lecture(s)</p>
                <p>{courseDuration} total length</p>
              </div>

              {/* lectures table */}
              <div className="border border-richblack-700 w-full">
                {course?.courseContent.map((section) => (
                  <Section key={section._id} section={section} />
                ))}
              </div>
            </div>

            {/* Author Name  */}
            <div className="flex flex-col gap-3 mt-5">
              <h1 className="text-4xl font-semibold">Author</h1>
              <div className="flex flex-row items-center gap-5">
                <img
                  alt="author img"
                  src={course?.instructor?.img}
                  className="aspect-square w-[78px] rounded-full object-cover"
                />
                <h1 className="text-lg">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <Footer />
      </div>
    )
  );
};

export default CoursePage;
