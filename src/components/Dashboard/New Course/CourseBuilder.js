import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";

const CourseBuilder = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form className="bg-richblack-800 flex flex-col gap-10 p-5 rounded-md  text-richblack-5 border border-richblack-600">
      <h1>Course Builder</h1>

      <div className="flex flex-col w-full gap-2">
        <label htmlFor="sectionName  " className="text-sm text-richblack-5">
          Section Name <span className="text-red-200">*</span>
        </label>
        <input
          required
          type="text"
          id="sectionName"
          name="sectionName"
          {...register("sectionName")}
          placeholder="Enter course title "
          className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
        />
      </div>

      <button className="flex flex-row items-center gap-3 bg-yellow-100 py-2 px-4 w-fit text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95">
        <p> Create Section </p>
        <AiOutlinePlusCircle />
      </button>

      <div className="flex flex-row gap-4 justify-end">
        <button className=" bg-richblack-500 py-2 px-4 w-fit text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95">
          Back
        </button>
        <button className=" bg-yellow-100 py-2 px-4 w-fit text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95">
          Next
        </button>
      </div>
    </form>
  );
};

export default CourseBuilder;
