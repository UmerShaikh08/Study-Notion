import React from "react";
import { useSelector } from "react-redux";

const useNewSubsection = () => {
  const { course } = useSelector((store) => store.course);
  const NewSubsection = ({ data, modalData, courseId }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("sectionId", modalData);
    formData.append("courseId", courseId);

    return formData;
  };

  return {
    NewSubsection,
  };
};

export default useNewSubsection;
