import React from "react";
import Instructor from "../../assets/Images/Instructor.png";
import { Highlight } from "./Highlight";
import { CTAButton } from "./Button";
import { FaArrowRight } from "react-icons/fa";

const BecomeInstructor = () => {
  return (
    <div className="w-11/12 max-w-maxContent mt-[3rem] flex flex-col lg:flex-row items-center text-white mx-auto gap-4">
      <div className=" shadow-[-20px_-20px_white] ">
        <img src={Instructor} />
      </div>
      <div className=" w-[80%] lg:w-[40%] mx-auto ">
        <div className="font-bold font-inter text-4xl  ">
          <p>Become an</p>
          <Highlight text={"Instructor"} />
        </div>
        <div className="text-richblack-400 font-inter font-medium my-5">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </div>
        <div className="">
          <CTAButton active={true} linkTo={"/signup"}>
            <div className="flex flex-row items-center gap-3">
              Start Teaching Today <FaArrowRight />{" "}
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
