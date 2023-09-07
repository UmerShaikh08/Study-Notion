import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineNavigateNext } from "react-icons/md";
import Tags from "./Tags";
import Upload from "../Upload";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Requirement from "./Requirement";

// redux
import { setCourse, setStep } from "../../../../Redux/Slices/courseSlice";

// backend calls
import { getAllCategories } from "../../../../services/operations/category";
import {
  EditCourse,
  createCourse,
} from "../../../../services/operations/courses";

// custom hooks
import useNewFormData from "./hooks/useNewFormData";
import useEditFormData from "./hooks/useEditFormData";

const CourseInfo = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { course, editCourse } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { updateFormData } = useNewFormData();
  const { editFormData } = useEditFormData();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  //  category

  const getCategories = async () => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await getAllCategories();
      if (response.length > 0) setCategory(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to fetch category");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    getCategories();

    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("category", course.category);
      setValue("price", course.price);
      setValue("tags", course.tags);
      setValue("thumbnail", course.thumbnail);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("requirements", course.requirements);
    }
  }, []);

  const isFromUpdated = (values) => {
    if (
      values.courseName !== course.courseName ||
      values.courseDescription !== course.courseDescription ||
      values.price !== course.price ||
      values.tags.toString() !== course.tags.toString() ||
      values.thumbnail !== course.thumbnail ||
      values.whatYouWillLearn !== course.whatYouWillLearn ||
      values.requirements.toString() !== course.requirements.toString()
    )
      return true;
    else return false;
  };

  const submitData = async (data) => {
    setLoading(true);
    if (editCourse) {
      const values = getValues();
      console.log("price =====>", values.price);
      const isForm = isFromUpdated(values);

      if (isForm) {
        const formData = await editFormData({ data, values });

        const result = await EditCourse(formData, token);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      setLoading(false);
      return;
    }

    //  it return FromData which have all details about new course
    const newCourseFormData = await updateFormData({ data });
    const result = await createCourse(newCourseFormData, token);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col gap-8 bg-richblack-800 rounded-md text-richblack-5 py-3 px-4"
    >
      {/* title */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="courseName  " className="text-sm">
          Course Title <span className="text-red-200">*</span>
        </label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          {...register("courseName", { required: true })}
          placeholder="Enter course title "
          className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
        />
        {errors.courseName && (
          <span className="ml-2 text-xs tracking-wide text-yellow-100">
            Course Name is required
          </span>
        )}
      </div>
      {/* description */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="courseDescription  " className="text-sm">
          Course Short Description <span className="text-red-200">*</span>
        </label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          {...register("courseDescription", { required: true })}
          placeholder="Enter Description "
          className=" pt-3 h-[10rem] w-full bg-richblack-700  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
        />
        {errors.courseDescription && (
          <span className="ml-2 text-xs tracking-wide text-yellow-100">
            Course Description is required
          </span>
        )}
      </div>
      {/* price */}
      <div className=" relative flex flex-col w-full gap-2">
        <label htmlFor="price  " className="text-sm">
          Course Price <span className="text-red-200">*</span>
        </label>

        <input
          disabled={loading}
          type="text"
          id="price"
          name="price"
          {...register("price", { required: true, valueAsNumber: true })}
          placeholder="Enter course Price "
          className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 pl-10"
        />
        <HiOutlineCurrencyRupee
          size={30}
          className="absolute top-[50%] text-richblack-500 left-[1%] "
        />
        {errors.price && (
          <span className="ml-2 text-xs tracking-wide text-yellow-100">
            Course Price is required
          </span>
        )}
      </div>
      {/* course category */}
      <div className="flex w-full flex-col">
        <label htmlFor="category">
          Course Category <span className="text-red-200">*</span>
        </label>
        <select
          id="category"
          name="category"
          defaultValue={""}
          className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          {...register("category", { required: true })}
        >
          <option disabled value={""}>
            Choose a Category
          </option>
          {category?.map((ele, idx) => {
            return (
              <option key={idx} value={ele?._id}>
                {" "}
                {ele.name}
              </option>
            );
          })}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-yellow-100">
            Course Category is required
          </span>
        )}
      </div>
      {/* tags */}
      <Tags
        disabled={loading}
        name={"tags"}
        register={register}
        setValue={setValue}
        errors={errors}
      />
      {/* upload thumbnail */}
      <Upload
        disabled={loading}
        name="thumbnail"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={null}
      />

      {/* Benefits of the course  */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="whatYouWillLearn  " className="text-sm">
          Benefits of the course <span className="text-red-200">*</span>
        </label>
        <textarea
          disabled={loading}
          id="whatYouWillLearn"
          name="whatYouWillLearn"
          {...register("whatYouWillLearn", { required: true })}
          placeholder="Enter Benefits of the course "
          className="pt-3  h-[10rem] w-full bg-richblack-700  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
        />
        {errors.whatYouWillLearn && (
          <span className="ml-2 text-xs tracking-wide text-yellow-100">
            Course Benefits are required
          </span>
        )}
      </div>
      {/* requirements or instructions */}
      <Requirement
        name="requirements"
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <div className="flex flex-row justify-end gap-4">
        {editCourse && (
          <button
            disabled={loading}
            className="py-2 px-3 bg-richblack-300 rounded-md text-richblack-900 font-semibold transition-all duration-200 hover:scale-95"
            onClick={() => dispatch(setStep(2))}
          >
            Countinue without saving
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-3 flex flex-row items-center bg-yellow-50 rounded-md text-richblack-900 font-semibold transition-all duration-200 hover:scale-95"
        >
          {editCourse ? "Save Changes" : "Next"} <MdOutlineNavigateNext />
        </button>
      </div>
    </form>
  );
};

export default CourseInfo;
