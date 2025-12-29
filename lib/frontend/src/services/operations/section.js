import apiConnector from "../apiConnector";
import { toast } from "react-hot-toast";
import { section } from "../apis";

const createSection = async (sectionName, courseId, token) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    response = await apiConnector(
      "POST",
      section.CREATE_SECTION,
      { sectionName, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("create section response -->", response);

    if (!response.data.success) {
      toast.error("failed to create section ");
      throw new Error("failed to create section ");
    }

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
    response = await apiConnector(
      "POST",
      section.UPDATE_SECTION,
      { sectionName, sectionId, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("update section response -->", response);

    if (!response.data.success) {
      toast.error("failed to update section ");
      throw new Error("failed to update section ");
    }

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
    response = await apiConnector(
      "POST",
      section.DELETE_SECTION,
      { sectionId, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("delete section response -->", response);

    if (!response.data.success) {
      toast.error("failed to delete section ");
      throw new Error("failed to delete section ");
    }

    toast.success("Section deleted successfully");
  } catch (error) {
    console.log(error);

    toast.error("failed to delete section ");
  }
  toast.dismiss(toastId);
  return response?.data?.course;
};

export { createSection, deleteSection, updateSection };
