import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import CourseBuilder from "./CourseBuilder";
import CourseInfo from "./CourseInfo/CourseInfo";

const AddCourse = () => {
  const { step } = useSelector((store) => store.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className=" w-[90%] lg:w-[60%]">
      {/* course upload */}
      <div className="flex flex-col gap-14 ">
        <h1 className="text-4xl font-semibold font-inter text-richblack-5">
          Add Course
        </h1>
        <div>
          <div className="flex flex-row justify-center items-center gap-0 text-richblack-5">
            {steps.map((items) => (
              <Fragment key={items.id}>
                <div
                  className={`w-10 h-10 rounded-full border border-richblack-5  flex items-center justify-center ${
                    step >= items.id
                      ? "text-yellow-100 border-yellow-100"
                      : "text-richblack-5 border-richblack-5"
                  }   
                
                 `}
                >
                  {step > items.id ? (
                    <AiOutlineCheck className="bg-yellow-25 text-richblack-900 p-2 w-10 h-10 rounded-full outline-none " />
                  ) : (
                    items.id
                  )}
                </div>
                {steps.length !== items.id ? (
                  <div
                    className={` border-[2px] border-dashed w-[30%] ${
                      step > items.id
                        ? "border-yellow-100"
                        : "border-richblack-400"
                    }`}
                  ></div>
                ) : (
                  ""
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-richblack-5 flex flex-row justify-around w-[95%]">
            <p>Course Information</p>
            <p>Course Builder</p>
            <p>Publish</p>
          </div>
        </div>

        {step === 1 && <CourseInfo />}
        {step === 2 && <CourseBuilder />}
      </div>

      {/* course upload tips  */}
    </div>
  );
};

export default AddCourse;

{
  /* <div className="border border-dashed w-[30%]"></div>
<div className="w-10 h-10 rounded-full border border-richblack-5  flex items-center justify-center">
  2
</div>
<div className="border border-dashed w-[30%]"></div>
<div className="w-10 h-10 rounded-full border border-richblack-5  flex items-center justify-center">
  3
</div> */
}
