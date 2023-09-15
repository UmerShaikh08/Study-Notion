import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { courseProgress } from "../apis";

const markCourseLecture = async (courseId, subsectionId, token) => {
  const toastId = toast.loading("Loading...");

  let response = null;
  try {
    response = await apiConnector(
      "POST",
      courseProgress.ADD_COURSE_PROGRESS,
      { courseId, subsectionId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("course progress data ----->", response);

    if (!response.data.success) {
      toast.error("failed to mark  lectures");
      throw new Error("failed to check completed lectures");
    }

    toast.success("Lecture Completed");
  } catch (error) {
    console.log(error);
    toast.error("failed to check completed lectures");
  }

  toast.dismiss(toastId);
  return response?.data?.courseProgress?.completedVideos;
};

export { markCourseLecture };
