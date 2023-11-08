import Banner from "../assets/Images/banner.mp4";
import Footer from "../components/common/Footer";
import Reviews from "../components/home/Reviews";
import CodeBlock from "../components/home/CodeBlock";
import ExploreMore from "../components/home/ExploreMore";
import CourseSlider from "../components/catalog/CourseSlider";
import TimeLineSection from "../components/home/TimeLineSection";
import BecomeInstructor from "../components/home/BecomeInstructor";
import CourseCardShimmer from "../components/shimmer/CourseCardShimmer";
import LearnLanguageSection from "../components/home/LearnLanguageSection";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { CTAButton } from "../components/home/Button";
import { Highlight } from "../components/home/Highlight";
import { FaArrowRight } from "react-icons/fa";
import { getAllCourses } from "../services/operations/courses";
import { useErrorBoundary } from "react-error-boundary";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [courses, setCourses] = useState(null);
  const { showBoundary, ErrorBoundary } = useErrorBoundary();

  const fetchCourses = async () => {
    const result = await getAllCourses(showBoundary);
    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchCourses();
    Aos.init({
      duration: 1500,
      delay: 250,
    });
  }, []);
  return (
    <div className="m-[1vh] scroll-smooth">
      {/* section 1 */}
      <div className="relative  mx-auto flex flex-col w-11/12v max-w-maxContent items-center justify-between text-white">
        <div className="flex items-center flex-col">
          <Link to={"/signup"}>
            <div
              data-aos="fade-up"
              className=" mt-9 w-fit bg-richblack-800 rounded-full py-2 px-3 shadow-sm shadow-richblack-500 border-[5px] border-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-richblack-900 hover:border-richblack-800 hover:shadow-none  "
            >
              <div className="flex gap-2 items-center text-richblack-200 ">
                <p>Become an instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>
          <div
            data-aos="fade-up"
            className="mt-3 font-medium text-4xl flex items-center flex-wrap text-center  "
          >
            Empower Your future With&nbsp; <Highlight text={"Coding Skills"} />
          </div>
          <p
            data-aos="fade-up"
            className=" mt-3 w-[90%]  font-bold tracking-wider font-inter text-lg text-center text-richblack-300 leading-8"
          >
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>

          <div data-aos="fade-up" className="flex mt-3 gap-4 ">
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton linkTo={"/login"}>Book a Demo</CTAButton>
          </div>

          <div
            data-aos="fade-right"
            className="  my-10 w-[90%]  shadow-[10px_-5px_50px_-5px] shadow-richblue-200   "
          >
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
            <div data-aos="fade-right">
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
            <div data-aos="fade-left">
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
