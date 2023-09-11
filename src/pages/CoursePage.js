import React from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getCourseFullDetails } from "../services/operations/courses";
import { useSelector } from "react-redux";
import { GetAvgRating } from "../utils/avgRating";
import Section from "../components/course/Section";
import CourseBuyCard from "../components/course/CourseBuyCard";
import CourseDetails from "../components/course/CourseDetails";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const { token } = useSelector((store) => store.auth);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [avgReviewCount, setAverageReviewCount] = useState(0);
  const [courseDuration, setCourseDuration] = useState(0);

  const { id } = useParams();

  const fetchCourse = async () => {
    const result = await getCourseFullDetails(id, token);

    if (result) {
      setCourse(result);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    const count = GetAvgRating(course?.data?.courseDetails.ratingAndReviews);
    setAverageReviewCount(count);
  }, [course]);

  useEffect(() => {
    let lectures = 0;
    let time = 0;
    course?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
      sec?.subSection?.forEach((lectures) => {
        time += lectures?.timeDuration;
      });
    });
    setCourseDuration(time);
    console.log(time);
    setTotalNoOfLectures(lectures);
  }, [course]);

  return (
    <div className="bg-richblack-900 w-full text-richblack-5">
      {/* section 1 */}
      <section className="bg-richblack-800 w-full pt-[4rem] mb-[5rem] pb-[5rem]">
        <div className="w-11/12 mx-auto max-w-maxContent ml-0 md:ml-auto ">
          <div className=" flex flex-col md:flex-row relative w-full gap-5 ">
            {/* details of course */}
            <CourseDetails course={course} />

            {/* buy course card */}
            <CourseBuyCard course={course} />
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
              <p>{courseDuration.toFixed(2)}s total length</p>
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
  );
};

export default CoursePage;
