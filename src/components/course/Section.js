import React from "react";
import { useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Section = ({ section }) => {
  console.log("Section ---->", section);

  const [showLectures, setShowLectures] = useState(true);

  return (
    <>
      <div className="flex flex-row border-b  overflow-hidden transition-[0.3s] border-richblack-600 justify-between p-6 bg-richblack-700">
        <div
          onClick={() => setShowLectures(!showLectures)}
          className="flex flex-row items-center gap-1 cursor-pointer "
        >
          {showLectures ? <IoIosArrowDown /> : <IoIosArrowUp />}
          <p>{section?.sectionName} 1</p>
        </div>
        <div className="hidden md:block">
          {section?.subSection?.length} lecture(s)
        </div>
      </div>

      {section &&
        section?.subSection?.map((lecture) => (
          <div
            key={lecture._id}
            className="relative h-0  bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease] "
            style={showLectures ? { height: "88px" } : { height: "0px" }}
          >
            {showLectures && (
              <div
                className={`p-6 flex flex-col overflow-hidden gap-2 w-full  `}
              >
                <div className="flex  flex-row gap-2 items-center">
                  <HiOutlineVideoCamera />
                  <div>{lecture.title}</div>
                </div>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Section;
