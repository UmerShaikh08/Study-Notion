import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { course } from "../apis";

const editCourse = async (data, token) => {
  console.log(data);
  let response;
  try {
    response = await apiConnector("POST", course.EDIT_COURSE, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      toast.error("failed to edit course");
      throw new Error("failed to edit course");
    }

    toast.success("edited course successfully");
  } catch (error) {
    console.log(error);
    toast.error("failed to edit course");
  }

  return response?.data?.data;
};
const createCourse = async (data, token) => {
  const toastId = toast.loading("loading...");
  console.log(data);
  let response;
  try {
    response = await apiConnector("POST", course.CREATE_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      toast.error("failed to create course");
      throw new Error("failed to create course");
    }

    toast.success("course create successfully");
  } catch (error) {
    console.log(error);
    toast.error("failed to create course");
  }

  toast.dismiss(toastId);
  return response?.data?.data;
};

export { editCourse, createCourse };
