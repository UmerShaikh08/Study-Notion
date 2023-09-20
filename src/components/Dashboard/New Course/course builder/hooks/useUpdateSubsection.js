const useUpdateSubsection = () => {
  const UpdateSubsection = ({ modalData, values, courseId }) => {
    const formData = new FormData();

    formData.append("subSectionId", modalData?.subSectionId);
    formData.append("courseId", courseId);

    if (modalData.title !== values?.title) {
      formData.append("title", values?.title);
    }
    if (modalData?.description !== values?.description) {
      formData.append("description", values?.description);
    }

    if (modalData?.videoFile !== values?.videoFile) {
      formData.append("videoFile", values?.videoFile);
    }
    return formData;
  };

  return {
    UpdateSubsection,
  };
};

export default useUpdateSubsection;
