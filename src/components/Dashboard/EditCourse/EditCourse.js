import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCourse,
  getCourseDetails,
} from "../../../services/operations/courses";
import { setCourse, setEditCourse } from "../../../Redux/Slices/courseSlice";
import AddCourse from "../New Course/AddCourse";
import { useState } from "react";

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
