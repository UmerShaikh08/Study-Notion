import { COURSE_STATUS } from "../../../../../utils/constants";

const useNewFormData = () => {
  const updateFormData = async ({ data }) => {
    const updatedFormData = new FormData();
    updatedFormData.append("courseName", data.courseName);
    updatedFormData.append("courseDescription", data.courseDescription);
    updatedFormData.append("price", data.price);
    updatedFormData.append("category", data.category);
    updatedFormData.append("tags", data.tags);
    updatedFormData.append("ImgFile", data.thumbnail);
    updatedFormData.append("whatYouWillLearn", data.whatYouWillLearn);
    updatedFormData.append("requirements", JSON.stringify(data.requirements));
    updatedFormData.append("status", COURSE_STATUS.DRAFT);

    return updatedFormData;
  };

  return {
    updateFormData,
  };
};

export default useNewFormData;
