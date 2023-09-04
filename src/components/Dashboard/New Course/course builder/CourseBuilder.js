import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import NestedView from "./NestedView";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../Redux/Slices/courseSlice";

// backend
import {
  createSection,
  updateSection,
} from "../../../../services/operations/section";
import { toast } from "react-hot-toast";

const CourseBuilder = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSection, setEditSection] = useState(null);
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const goback = (e) => {
    e.preventDefault();
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };

  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
  };

  const handleEditSection = (sectionId, sectionName) => {
    if (editSection === sectionId) {
      cancelEdit();
      return;
    }

    setEditSection(sectionId);
    setValue("sectionName", sectionName);
  };

  const handleSection = async (e) => {
    e.preventDefault();

    if (editSection) {
      const sectionName = await getValues("sectionName");
      const result = await updateSection(
        sectionName,
        editSection,
        course?._id,
        token
      );

      if (result) {
        dispatch(setCourse(result));
        setValue("sectionName", "");
        setEditSection(null);
      }

      return;
    }

    const sectionName = await getValues("sectionName");
    const result = await createSection(sectionName, course._id, token);
    if (result) {
      dispatch(setCourse(result));
      setValue("sectionName", "");
    }
    return;
  };

  const nextPage = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  return (
    <div className="bg-richblack-800 flex flex-col gap-10 p-5 rounded-md  text-richblack-5 border border-richblack-600">
      <form
        onSubmit={handleSection}
        className="bg-richblack-800 flex flex-col gap-10 p-5 rounded-md  text-richblack-5 "
      >
        <h1>Course Builder</h1>

        <div className="flex flex-col w-full gap-2">
          <label htmlFor="sectionName  " className="text-sm text-richblack-5">
            Section Name <span className="text-red-200">*</span>
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            {...register("sectionName", { required: true })}
            placeholder="Enter course title "
            className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
        </div>

        <div className="flex flex-row gap-4 ">
          <button
            type="submit"
            className="flex flex-row items-center gap-3 bg-yellow-100 py-2 px-4 w-fit text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95"
          >
            <p>{editSection ? "Edit Section Name" : "Create Section"} </p>
            <AiOutlinePlusCircle />
          </button>
          {editSection && (
            <button
              onClick={(e) => {
                e.preventDefault();
                cancelEdit();
              }}
              className="text-richblack-300 border-b border-richblack-300 text-sm h-fit self-end"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleEditSection={handleEditSection} />
      )}

      <div className="flex flex-row gap-4 justify-end">
        <button
          onClick={goback}
          className=" bg-richblack-400 py-2 px-4 w-fit text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95"
        >
          Back
        </button>
        <button
          onClick={nextPage}
          className=" bg-yellow-100 py-2 px-4 w-fit flex flex-row items-center  text-richblack-900 rounded-md font-medium transition-all duration-200 hover:scale-95"
        >
          Next <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
