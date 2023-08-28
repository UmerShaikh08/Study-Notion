import { useState } from "react";

const useNewFormData = () => {
  const [formData, setFormData] = useState(new FormData());

  const updateFormData = ({ data }) => {
    console.log("i am in use new form hook -->", data);
    const updatedFormData = new FormData();
    updatedFormData.append("courseName", data.courseName);
    updatedFormData.append("courseDescription", data.courseDescription);
    updatedFormData.append("price", data.price);
    updatedFormData.append("category", data.category);
    updatedFormData.append("tags", data.tags);
    updatedFormData.append("ImgFile", data.thumbnail);
    updatedFormData.append("whatYouWillLearn", data.whatYouWillLearn);
    updatedFormData.append("requirements", JSON.stringify(data.requirements));

    setFormData(updatedFormData);
  };

  return {
    formData,
    updateFormData,
  };
};

export default useNewFormData;
