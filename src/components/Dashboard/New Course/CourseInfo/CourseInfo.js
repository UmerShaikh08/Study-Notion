import React, { useRef, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineNavigateNext } from "react-icons/md";
import Tags from "./Tags";
import Upload from "../Upload";
import { useEffect } from "react";
import { getAllCategories } from "../../../../services/operations/category";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Requirement from "./Requirement";
import { setCourse, setStep } from "../../../../Storage/Slices/courseSlice";
import useEditFormData from "./hooks/useEditFormData";
import { createCourse } from "../../../../services/operations/courses";
import useNewFormData from "./hooks/useNewFormData";

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

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to fetch category");
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    getCategories();

    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
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
    console.log(data);

    if (editCourse) {
      const values = getValues();
      const isForm = isFromUpdated(values);

      if (isForm) {
        const FormData = editFormData({ data, values });
        const result = await dispatch(editCourse(FormData, token));
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    //  it return FromData which have all details about new course
    const newCourseFormData = await updateFormData({ data });
    const result = await createCourse(newCourseFormData, token);

    if (result) {
      setStep(2);
      dispatch(setCourse(result));
    }
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
          required
          type="text"
          id="courseName"
          name="courseName"
          {...register("courseName")}
          placeholder="Enter course title "
          className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
        />
      </div>

      {/* description */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="courseDescription  " className="text-sm">
          Course Short Description <span className="text-red-200">*</span>
        </label>
        <textarea
          required
          id="courseDescription"
          name="courseDescription"
          {...register("courseDescription")}
          placeholder="Enter Description "
          className=" pt-3 h-[10rem] w-full bg-richblack-700  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
        />
      </div>

      {/* price */}
      <div className=" relative flex flex-col w-full gap-2">
        <label htmlFor="price  " className="text-sm">
          Course Price <span className="text-red-200">*</span>
        </label>

        <input
          required
          type="text"
          id="price"
          name="coursePrice"
          {...register("price", { valueAsNumber: true })}
          placeholder="Enter course Price "
          className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 pl-10"
        />
        <HiOutlineCurrencyRupee
          size={30}
          className="absolute top-[50%] text-richblack-500 left-[1%] "
        />
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
      </div>

      {/* tags */}
      <Tags name={"tags"} register={register} setValue={setValue} />

      {/* upload thumbnail */}
      <Upload
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
          Benefits of the course *<span className="text-red-200">*</span>
        </label>
        <textarea
          required
          id="whatYouWillLearn"
          name="whatYouWillLearn"
          {...register("whatYouWillLearn")}
          placeholder="Enter Benefits of the course "
          className="pt-3  h-[10rem] w-full bg-richblack-700  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
        />
      </div>

      {/* requirements or instructions */}
      <Requirement
        name="requirements"
        register={register}
        setValue={setValue}
      />

      <div className="flex flex-row justify-end gap-4">
        {
          <button
            className="py-2 px-3 bg-richblack-300 rounded-md text-richblack-900 font-semibold transition-all duration-200 hover:scale-95"
            onClick={() => dispatch(setStep(2))}
          >
            Countinue without saving
          </button>
        }
        <button
          type="submit"
          className="py-2 px-3 flex flex-row items-center bg-yellow-50 rounded-md text-richblack-900 font-semibold transition-all duration-200 hover:scale-95"
        >
          {editCourse ? "Save Changes" : "Next"} <MdOutlineNavigateNext />
        </button>
      </div>
    </form>
  );
};

export default CourseInfo;
