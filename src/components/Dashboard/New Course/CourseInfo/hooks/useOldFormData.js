import React from "react";
import { useSelector } from "react-redux";

const useOldFormData = (values = {}, data = {}) => {
  const { course } = useSelector((store) => store.course);
  const formData = new FormData();

  formData.append("courseId", course?._id);
  if (course?.courseName !== values?.coursetitle)
    formData.append("courseName", data?.coursetitle);

  if (course?.courseDescription !== values?.courseDescription)
    formData.append("courseDescription", data?.courseDescription);

  if (course?.price !== values?.price) formData.append("price", data?.price);

  if (course?.tags !== values?.courseTag)
    formData.append("tags", data?.courseTag);

  if (course?.thumbnail !== values?.courseImage)
    formData.append("thumbnail", data?.courseImage);

  if (course?.whatYouWillLearn !== values?.courseBenefits)
    formData.append("whatYouWillLearn", data?.courseBenefits);

  if (course?.requirements.toString() !== values?.requirements.toString())
    formData.append("requirements", JSON.stringify(data?.requirements));

  return formData;
};

export default useOldFormData;
