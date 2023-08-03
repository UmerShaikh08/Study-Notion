import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CTAButton } from "../components/home/Button";
import { useState } from "react";
import Banner from "../assets/Images/banner.mp4";
import { Highlight } from "../components/home/Highlight";

const Home = () => {
  return (
    <div>
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
          <div className="mt-3 font-medium text-4xl flex items-center flex-wrap text-center ">
            Empower Your future With&nbsp;
            <Highlight text={"Coding Skills"} />
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

          <div className=" my-10 w-[90%]  shadow-[10px_-5px_50px_-5px] shadow-richblue-200  ">
            <video className="shadow-[20px_20px_white]" muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* section 2 */}

      {/* section 3 */}

      {/* footer */}
    </div>
  );
};

export default Home;
