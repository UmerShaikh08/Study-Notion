import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../Storage/Slices/profileSlice";
import apiConnector from "../apiConnector";
import { course, profile } from "../apis";
import { setToken } from "../../Storage/Slices/authSlice";
import { clearItems } from "../../Storage/Slices/cartSlice";

export const deleteAccount = (token, nevigate) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      console.log("token -->", token);
      // db call for delete account
      const response = await apiConnector(
        "DELETE",
        profile.DELETE_ACCOUNT,
        token,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // check req
      if (!response.data.success) {
        toast.error("Failed to Delete Account");
        dispatch(setLoading(false));
        throw new Error("Failed to Delete Account");
      }

      dispatch(setLoading(false));
      // remove all details of user from broweser
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(clearItems());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Account Deleted Successfully");
      dispatch(setLoading(false));
      nevigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Account");
      dispatch(setLoading(false));
    }
  };
};

export const updateProfileImg = (image, token, user) => {
  console.log(image);
  return async (dispatch) => {
    try {
      // db call to upload img
      dispatch(setLoading(true));
      const response = await apiConnector("PUT", profile.UPALOAD_IMG, image, {
        Authorization: `Bearer ${token}`,
      });

      // check req
      if (!response.data.success) {
        toast.error("Failed to Update");
        dispatch(setLoading(false));
        throw new Error("Image not updated");
      }

      console.log("resoponse ---->", response);
      // updating user
      const updateUser = {
        ...user,
        img: response.data.img,
      };

      dispatch(setUser(updateUser));
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

export const getEnrolledCourse = (token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "GET",
        course.GET_ENROLLED_COURSES,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // check req
      if (!response.data.success) {
        toast.error("Failed to get Enrolled Courses");
        dispatch(setLoading(false));
        console.log(response);
        throw new Error("Failed to get Enrolled Courses");
      }

      console.log("response -->", response);
      setLoading(false);
      return response.data?.courses;
    } catch (error) {
      console.log(error);
      toast.error("Failed to get Enrolled Course");
      dispatch(setLoading(false));
    }
  };
};
