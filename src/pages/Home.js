import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CTAButton } from "../components/home/Button";
import Banner from "../assets/Images/banner.mp4";
import { Highlight } from "../components/home/Highlight";
import CodeBlock from "../components/home/CodeBlock";
import LearnLanguageSection from "../components/home/LearnLanguageSection";
import TimeLineSection from "../components/home/TimeLineSection";
import BecomeInstructor from "../components/home/BecomeInstructor";
import ExploreMore from "../components/home/ExploreMore";
import Footer from "../components/common/Footer";
import Reviews from "../components/home/Reviews";
import { useState } from "react";
import { getAllCourses } from "../services/operations/courses";
import CourseSlider from "../components/catalog/CourseSlider";
import { useEffect } from "react";
import CourseCardShimmer from "../components/shimmer/CourseCardShimmer";

const Home = () => {
  const [courses, setCourses] = useState(null);

  const fetchCourses = async () => {
    const result = await getAllCourses();
    if (result) {
      setTimeout(() => {
        setCourses(result);
      }, 2000);

      console.log("result ", result);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="m-[1vh] scroll-smooth">
      {/* section 1 */}

      <div className="relative  mx-auto flex flex-col w-11/12v max-w-maxContent items-center justify-between text-white">
        <div className="flex items-center flex-col">
          <Link to={"/signup"}>
            <div className=" mt-9 w-fit bg-richblack-800 rounded-full py-2 px-3 shadow-sm shadow-richblack-500 border-[5px] border-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-richblack-900 hover:border-richblack-800 hover:shadow-none  ">
              <div className="flex gap-2 items-center text-richblack-200 ">
                <p>Become an instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>
          <div className="mt-3 font-medium text-4xl flex items-center flex-wrap text-center  ">
            Empower Your future With&nbsp; <Highlight text={"Coding Skills"} />
          </div>
          <p className=" mt-3 w-[90%]  font-bold tracking-wider font-inter text-lg text-center text-richblack-300 leading-8">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>

          <div className="flex mt-3 gap-4 ">
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton linkTo={"/login"}>Book a Demo</CTAButton>
          </div>

          <div className="  my-10 w-[90%]  shadow-[10px_-5px_50px_-5px] shadow-richblue-200   ">
            <video
              className="shadow-[20px_20px_white] mr-2"
              muted
              loop
              autoPlay
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
          {/* code section 1 */}

          <div>
            <div>
              <CodeBlock
                position={"lg:flex-row"}
                heading={
                  <div className=" text-3xl md:text-4xl font-semibold m-auto">
                    Unlock Your&nbsp;
                    <Highlight text={"coding potential"} />
                    &nbsp;with our online courses
                  </div>
                }
                description={
                  "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                btn1={{
                  btnText: "try it yourself",
                  linkto: "/signup/",
                  active: true,
                }}
                btn2={{
                  btnText: "Learn more",
                  linkto: "/login/",
                  active: false,
                }}
                code={`<<!DOCTYPE html>\n<html>\n<head>\n<title>This is myPage</title>\n</head>\n</body>\n<h1><ahref="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n <a href="/two">Two</a>\n <a href="/three">Three</a>`}
                codeColor={"text-yellow-25"}
                backgroudGradient={"grad"}
              />
            </div>
            {/* code section 2 */}
            <div>
              <CodeBlock
                position={"lg:flex-row-reverse"}
                heading={
                  <div className="text-3xl md:text-4xl font-semibold  ">
                    <p>Start &nbsp;</p>
                    <Highlight text={"coding in seconds"} />
                  </div>
                }
                description={
                  "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                btn1={{
                  btnText: "Continue Lesson",
                  linkto: "/signup",
                  active: true,
                }}
                btn2={{
                  btnText: "Learn more",
                  linkto: "/login",
                  active: false,
                }}
                code={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn ( \n<div>Home</div>\n}\nexport default Home;`}
                codeColor={"text-gradientBlue-200"}
                backgroudGradient={"grad2"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto box-content w-[90%] space-y-10  lg:py-12 lg:max-w-maxContent mb-6">
        <div className="text-4xl text-richblack-5">
          Courses to get you started
        </div>
        <div className="lg:py-8">
          {courses ? (
            <CourseSlider courses={courses} />
          ) : (
            <div className="flex flex-row">
              <CourseCardShimmer />
              <CourseCardShimmer />
              <CourseCardShimmer />
            </div>
          )}
        </div>
      </div>

      <ExploreMore />

      {/* section 2 */}

      <div className=" bg-pure-greys-5 text-richblack-900">
        <div className="bg_home h-[333px] flex justify-center mb-[4rem]">
          <div className="w-11/12 max-w-maxContent flex  lg:flex-row items-center justify-center">
            <div className="lg:mt-[10rem] flex gap-3 items-center flex-col md:flex-row">
              <CTAButton active={true} linkTo={"/singup"}>
                <div className="flex flex-row items-center gap-3 mx-auto ">
                  Explore Full Catelog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="  w-11/12 max-w-maxContent flex gap-8 m-6 flex-col lg:flex-row mx-auto ">
          <div className="text-4xl font-bold font-inter">
            Get the skills you need for a&nbsp;
            <Highlight text={"job that is in demand."}></Highlight>{" "}
          </div>
          <div className="lg:w-[50%]">
            <div>
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>
        <TimeLineSection />
        <LearnLanguageSection />
      </div>

      {/* section 3 */}
      <BecomeInstructor />

      {/* section 4 */}
      <Reviews />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
