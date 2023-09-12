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

    console.log(result);
    if (!result.data.success) {
      toast.error("Failed to add rating and reviews");
      throw new Error("Failed to add rating and reviews");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to add rating and reviews");
  }

  toast.dismiss(toastId);
  return result?.data?.course;
};

export { addRatingAndReview };
