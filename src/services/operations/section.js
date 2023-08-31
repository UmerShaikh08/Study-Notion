import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { section } from "../apis";

const createSection = async (sectionName, courseId, token) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    console.log(courseId);
    response = await apiConnector(
      "POST",
      section.CREATE_SECTION,
      { sectionName, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      toast.error("failed to create section ");
      throw new Error("failed to create section ");
    }

    console.log(response);
    toast.success("Section created successfully");
  } catch (error) {
    console.log(error);

    toast.error("failed to create section ");
  }
  toast.dismiss(toastId);
  return response?.data?.course;
};

const updateSection = async (sectionName, sectionId, courseId, token) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    console.log(sectionId);
    response = await apiConnector(
      "POST",
      section.UPDATE_SECTION,
      { sectionName, sectionId, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      toast.error("failed to update section ");
      throw new Error("failed to update section ");
    }

    console.log(response);
    toast.success("Section updated successfully");
  } catch (error) {
    console.log(error);

    toast.error("failed to update section ");
  }
  toast.dismiss(toastId);
  return response?.data?.course;
};

const deleteSection = async (sectionId, courseId, token) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    console.log(courseId);
    console.log("before deletion call ");
    response = await apiConnector(
      "POST",
      section.DELETE_SECTION,
      { sectionId, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("after deletion call");

    if (!response.data.success) {
      toast.error("failed to delete section ");
      throw new Error("failed to delete section ");
    }

    console.log(response);
    toast.success("Section deleted successfully");
  } catch (error) {
    console.log(error);

    toast.error("failed to delete section ");
  }
  toast.dismiss(toastId);
  return response?.data?.course;
};

export { createSection, deleteSection, updateSection };
