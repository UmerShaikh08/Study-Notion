import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { EditCourse } from "../../../../services/operations/courses";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCourseState,
  setStep,
} from "../../../../Redux/Slices/courseSlice";

const PublishCourse = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const goBack = (e) => {
    e.preventDefault();
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const gotoMyCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handlePublishedStatus = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      gotoMyCourse();
    }

    const formData = new FormData();

    formData.append("courseId", course?._id);

    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;

    formData.append("status", courseStatus);

    setLoading(true);
    const result = await EditCourse(formData, token);
    setLoading(false);

    if (result) {
      toast.success("Course Published ");
      gotoMyCourse();
    }
  };
  return (
    <div className="flex flex-col gap-10 bg-richblack-800  p-5 rounded-lg border border-richblack-700">
      <h1 className="text-3xl font-semibold text-richblack-5 ">
        Publish Settings
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handlePublishedStatus)}
      >
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            id="draft"
            {...register("public")}
            className=" border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5 "
          />
          <label htmlFor="draft" className="text-richblack-100 text-lg ">
            Make this course as public
          </label>
        </div>

        <div className="flex flex-row gap-3 justify-end">
          <button
            onClick={goBack}
            disabled={loading}
            className="bg-richblack-300 py-2 p-3 text-richblack-900 rounded-md font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-100 py-2 p-3 text-richblack-900 rounded-md font-medium "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
