const useGetIndex = () => {
  const getIdx = (
    courseSectionData,
    sectionId,
    subsectionId,
    setActiveStatus,
    setVideoActiveBar
  ) => {
    if (!courseSectionData.length) return;

    const sectionIdx = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const subSectionIdx = courseSectionData[sectionIdx]?.subSection?.findIndex(
      (subsection) => subsection._id === subsectionId
    );

    setActiveStatus(courseSectionData[sectionIdx]?._id);
    setVideoActiveBar(
      courseSectionData[sectionIdx]?.subSection[subSectionIdx]._id
    );
  };

  return {
    getIdx,
  };
};

export default useGetIndex;
