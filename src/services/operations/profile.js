import { toast } from "react-hot-toast";
import { setLoading } from "../../Storage/Slices/profileSlice";
import apiConnector from "../apiConnector";
import { profile } from "../apis";

export const updateProfileImg = (image, token) => {
  console.log(image);
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", profile.UPALOAD_IMG, image, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        toast.error("Failed to Update");
        dispatch(setLoading(false));
        throw new Error("Image not updated");
      }

      console.log("resoponse ---->", response);
      toast.success("Image Updated Successfully");
      dispatch(setLoading(false));
      // navigate("/dashboard/my-profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update  Image");
      dispatch(setLoading(false));
    }
  };
};

export const updateProfile = (data, token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(
        "PUT",

        profile.UPDATE_USER_DETAILS,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        toast.error("Failed to Update");
        dispatch(setLoading(false));
        throw new Error("profile not updated");
      }

      console.log("resoponse ---->", response);
      toast.success("Profile Updated Successfully");
      dispatch(setLoading(false));
      // navigate("/dashboard/my-profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update ");
      dispatch(setLoading(false));
    }
  };
};

export const updatePassword = (data, token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(
        "POST",

        profile.UPDATE_PASSWORD,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        toast.error("Failed to Update");
        dispatch(setLoading(false));
        throw new Error("Password not updated");
      }

      console.log("resoponse ---->", response);
      toast.success("Password Updated Successfully");
      dispatch(setLoading(false));
      // navigate("/dashboard/my-profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update ");
      dispatch(setLoading(false));
    }
  };
};
