import React from "react";
import Sections from "./Sections";
import { useSelector } from "react-redux";

const NestedView = ({ handleEditSection }) => {
  const { course } = useSelector((store) => store.course);

  return (
    <div className="bg-richblack-900 rounded-md p-3">
      {course?.courseContent?.length > 0 &&
        course?.courseContent.map((section) => (
          <Sections
            key={section?._id}
            section={section}
            handleEditSection={handleEditSection}
          />
        ))}
    </div>
  );
};

export default NestedView;
