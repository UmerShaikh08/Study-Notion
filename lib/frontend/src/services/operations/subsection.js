import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { subsection } from "../apis";

const createSubsection = async (data, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");

  try {
    response = await apiConnector("POST", subsection.CREATE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("Create SubSection Response -----> ", response);

    if (!response) {
      toast.error("Failed to create Subsection");
      throw new Error("Failed to create Subsection");
    }

    toast.success("Subsection Created Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to create Subsection");
  }

  toast.dismiss(toastId);
  return response?.data?.course;
};

const updateSubsection = async (data, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");

  try {
    response = await apiConnector("POST", subsection.UPDATE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("Update SubSection Response -----> ", response);

    if (!response) {
      toast.error("Failed to update Subsection");
      throw new Error("Failed to update Subsection");
    }

    toast.success("Subsection update Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to update Subsection");
  }

  toast.dismiss(toastId);
  return response?.data?.course;
};

const deleteSubsection = async (data, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    response = await apiConnector("POST", subsection.DELETE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    // console.log("Delete SubSection Response -----> ", response);

    if (!response) {
      toast.error("Failed to delete Subsection");
      throw new Error("Failed to delete Subsection");
    }

    toast.success("Subsection deleted Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete Subsection");
  }

  toast.dismiss(toastId);
  return response?.data?.course;
};

export { createSubsection, deleteSubsection, updateSubsection };
