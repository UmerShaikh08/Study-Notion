import React from "react";
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImg from "../../assets/Images/TimelineImage.png";
import TimeLineProfile from "./TimeLineProfile";

const TimeLineSection = () => {
  const logoList = [
    {
      logo: logo1,
      title: " Leadership",
      description: "Fully committed to the success company",
    },
    {
      logo: logo2,
      title: " Responsibility",
      description: "Students will always be our top priority",
    },
    {
      logo: logo3,
      title: " Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      logo: logo4,
      title: " Solve the problem",
      description: "Code your way to a solution",
    },
  ];

  return (
    <div className="w-11/12 max-w-maxContent flex flex-col items-center lg:flex-row gap-10  mt-[5rem] mx-auto">
      <div className=" w-[80%] lg:w-[40%] ">
        {logoList.map((element, index) => {
          return (
            <TimeLineProfile
              title={element.title}
              logo={element.logo}
              description={element.description}
              key={index}
              index={index}
            />
          );
        })}
      </div>
      <div
        data-aos="fade-left"
        className="relative w-[90%] lg:w-[50%] mb-5 shadow-[0px_0px_30px_0px]  shadow-gradientBlue-200 mx-auto"
      >
        <img
          alt="time line img"
          src={TimeLineImg}
          className="w-[90%] mx-auto object-cover shadow-white sm:h-[300px] md:h-[480px] "
        />
        <div className=" absolute left-[0] top-[0%] lg:top-auto   lg:bottom-[-4%] lg:left-[10%] right-auto flex flex-col  lg:flex-row justify-around  bg-caribbeangreen-700 text-white gap-6  lg:w-fit[80%] sm:[7rem] lg:h-[6rem] mx-auto ">
          <div className="flex  lg:flex-row items-center ">
            <div className="font-bold text-4xl mx-auto">10</div>
            <div className="text-[0.9rem] font-[400] w-[40%] text-caribbeangreen-300">
              YEARS EXPERIENCE
            </div>
          </div>
          <div className="border-l h-[2rem] my-auto hidden lg:block"></div>
          <div className="flex flex-row items-center">
            <div className="font-bold text-4xl mx-auto ">250</div>
            <div className="text-[0.9rem] font-[400] w-[40%] text-caribbeangreen-300 max-w-maxContent pr-2">
              TYPES OF COURSES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
// box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
