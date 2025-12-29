import { useSelector } from "react-redux";

const useEditFormData = () => {
  const { course } = useSelector((store) => store.course);

  const editFormData = ({ data, values }) => {
    const updatedFormData = new FormData();

    updatedFormData.append("courseId", course?._id);
    if (course?.courseName !== values?.courseName)
      updatedFormData.append("courseName", data?.courseName);

    if (course?.courseDescription !== values?.courseDescription)
      updatedFormData.append("courseDescription", data?.courseDescription);

    if (course?.category !== values?.category)
      updatedFormData.append("category", data?.category);

    if (course?.price !== values?.price)
      updatedFormData.append("price", data?.price);

    if (course?.tags !== values?.tags)
      updatedFormData.append("tags", data?.tags);

    if (course?.thumbnail !== values?.thumbnail)
      updatedFormData.append("thumbnail", data?.thumbnail);

    if (course?.whatYouWillLearn !== values?.whatYouWillLearn)
      updatedFormData.append("whatYouWillLearn", data?.whatYouWillLearn);

    if (course?.requirements?.toString() !== values?.requirements?.toString())
      updatedFormData.append(
        "requirements",
        JSON.stringify(data?.requirements)
      );

    return updatedFormData;
  };

  return {
    editFormData,
  };
};

export default useEditFormData;
