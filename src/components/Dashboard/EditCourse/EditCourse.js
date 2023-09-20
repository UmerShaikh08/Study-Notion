import React from "react";
import AddCourse from "../New Course/AddCourse";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCourseDetails } from "../../../services/operations/courses";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../Redux/Slices/courseSlice";

const EditCourse = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const fetchCourse = async () => {
    setLoading(true);
    const result = await getCourseDetails(id, token);
    setLoading(false);

    if (result) {
      dispatch(setCourse(result));
      dispatch(setEditCourse(true));
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      {course && !loading ? (
        <AddCourse />
      ) : (
        <h1 className="text-4xl text-richblack-5 text-center">
          Course not Found{" "}
        </h1>
      )}
    </div>
  );
};

export default EditCourse;
