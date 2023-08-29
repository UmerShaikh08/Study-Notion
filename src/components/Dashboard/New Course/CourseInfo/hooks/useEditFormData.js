import { useSelector } from "react-redux";

const useEditFormData = () => {
  const { course } = useSelector((store) => store.course);

  const editFormData = ({ data, values }) => {
    const updatedFormData = new FormData();

    updatedFormData.append("courseId", course?._id);
    if (course?.courseName !== values?.coursetitle)
      updatedFormData.append("courseName", data?.coursetitle);

    if (course?.courseDescription !== values?.courseDescription)
      updatedFormData.append("courseDescription", data?.courseDescription);

    if (course?.price !== values?.price)
      updatedFormData.append("price", data?.price);

    if (course?.tags !== values?.courseTag)
      updatedFormData.append("tags", data?.courseTag);

    if (course?.thumbnail !== values?.courseImage)
      updatedFormData.append("thumbnail", data?.courseImage);

    if (course?.whatYouWillLearn !== values?.courseBenefits)
      updatedFormData.append("whatYouWillLearn", data?.courseBenefits);

    if (course?.requirements.toString() !== values?.requirements.toString())
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
