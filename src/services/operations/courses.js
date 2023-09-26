import apiConnector from "../apiConnector";
import { toast } from "react-hot-toast";
import { course } from "../apis";

const EditCourse = async (data, token) => {
  try {
    const response = await apiConnector("POST", course.EDIT_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      toast.error("failed to edit course");
      throw new Error("failed to edit course");
    }

    const ans = response?.data?.data;
    console.log(" edit course response  ---> ", response);
    return ans;
  } catch (error) {
    console.log(error);
    toast.error("failed to edit course");
  }
};

const createCourse = async (data, token) => {
  const toastId = toast.loading("loading...");

  let response;
  try {
    response = await apiConnector("POST", course.CREATE_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("create course response --->", response);

    if (!response.data.success) {
      toast.dismiss(toastId);
      toast.error("failed to create course");
      throw new Error("failed to create course");
    }

    toast.success("Courses Added");
  } catch (error) {
    console.log(error);
    toast.error("failed to create course");
  }

  toast.dismiss(toastId);
  return response?.data?.data;
};

const getInstructorCourses = async (token) => {
  const toastId = toast.loading("loading...");

  let response = null;
  try {
    response = await apiConnector("GET", course.GET_INSTRUCTOR_COURSES, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log(" instructor course Responnseee ---->", response);

    if (!response.data.success) {
      toast.error("Courses not found");
      throw new Error("Courses not found");
    }
  } catch (error) {
    console.log(error);
    toast.error("Courses not found");
  }

  toast.dismiss(toastId);

  return response?.data?.Instructor;
};

const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("loading...");

  let response;
  try {
    response = await apiConnector(
      "DELETE",
      course.DELETE_COURSE,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(" delete course Responnseee ---->", response);

    if (!response.data.success) {
      toast.error("failed to Delete course ");
      throw new Error("failed to Delete course ");
    }

    toast.success("Course Deleted ");
  } catch (error) {
    console.log(error);
    toast.error("failed to Delete  course");
  }

  toast.dismiss(toastId);
  return response?.data?.Instructor?.courses;
};

const getCourseDetails = async (courseId, token) => {
  const toastId = toast.loading("loading...");

  let response;
  try {
    response = await apiConnector(
      "POST",
      course.GET_COURSE_DETAILS,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(" get course details Responnseee ---->", response);

    if (!response.data.success) {
      toast.error("Failed to Load Course ");
      throw new Error("Failed to Load Course ");
    }

    toast.success("Course Fetched");
  } catch (error) {
    console.log(error);
    toast.error("Failed to Load Course");
  }

  toast.dismiss(toastId);
  return response?.data?.data;
};

const getCourseFullDetails = async (courseId, token, showBoundary) => {
  const toastId = toast.loading("loading...");

  let response;
  try {
    response = await apiConnector(
      "POST",
      course.GET_COURSE_FULL_DETAILS,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("get course full details Responnseee ---->", response);

    if (!response.data.success) {
      toast.error("Failed to Fetch Course ");
      throw new Error("Failed to Fetch Course ");
    }

    toast.success("Course Fetched");
  } catch (error) {
    showBoundary(error);
    console.log(error);
    toast.error("Failed to Load Course");
  }

  toast.dismiss(toastId);
  return response?.data?.data;
};

const getAllCourses = async () => {
  let response;
  try {
    response = await apiConnector("GET", course.GET_ALL_COURSES);

    console.log(" get all course Responnseee ---->", response);

    if (!response.data.success) {
      toast.error("Failed to Fetch Course ");
      throw new Error("Failed to Fetch Course ");
    }
  } catch (error) {
    console.log(error);

    toast.error("Failed to Load Course");
  }

  return response?.data?.courses;
};

export {
  EditCourse,
  createCourse,
  getInstructorCourses,
  deleteCourse,
  getCourseDetails,
  getCourseFullDetails,
  getAllCourses,
};
