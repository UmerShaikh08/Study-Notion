import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { ratingAndReviews } from "../apis";

const addRatingAndReview = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    result = await apiConnector(
      "POST",
      ratingAndReviews.ADD_RATING_AND_REVIEWS,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("result -->", result);
    if (!result.data.success) {
      toast.error("Failed to add rating and reviews");
      throw new Error("Failed to add rating and reviews");
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);
  }

  toast.dismiss(toastId);
  return result?.data?.course;
};

const getAllRatingReviews = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    result = await apiConnector("GET", ratingAndReviews.GET_ALL_REVIEW, null);

    console.log("result -->", result);
    if (!result.data.success) {
      toast.error("Failed to get rating and reviews");
      throw new Error("Failed get add rating and reviews");
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Failed to review ");
  }

  toast.dismiss(toastId);
  return result?.data?.data;
};

export { addRatingAndReview, getAllRatingReviews };
