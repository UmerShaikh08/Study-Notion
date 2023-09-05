import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import CourseInfo from "./CourseInfo/CourseInfo";
import CourseBuilder from "./course builder/CourseBuilder";
import PublishCourse from "./publishCourse/PublishCourse";

const AddCourse = () => {
  const { step } = useSelector((store) => store.course);
  const { editCourse } = useSelector((store) => store.course);
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
    <>
      <div className="  lg:w-[100%] flex flex-row h-full justify-around  md:mb-auto">
        {/* course upload */}
        <div className="flex w-[90%] md:w-[80%] lg:w-[50%] flex-col gap-14 ">
          <h1 className="text-4xl font-semibold font-inter text-richblack-5">
            {editCourse ? "Edit Course" : "Add Course"}
          </h1>
          <div>
            <div className="flex flex-row justify-center items-center gap-0 text-richblack-5">
              {steps.map((items) => (
                <Fragment key={items.id}>
                  <div
                    className={`w-10 h-10 rounded-full border border-richblack-5  flex items-center justify-center ${
                      step >= items.id
                        ? "text-yellow-100 border-yellow-100"
                        : "text-richblack-5 border-richblack-500 bg-richblack-800"
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
                      className={` border border-dashed w-[30%] ${
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
          {step === 3 && <PublishCourse />}
        </div>

        {/* course upload tips  */}
        <div className="sticky top-20 hidden max-w-[400px] h-fit flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
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
