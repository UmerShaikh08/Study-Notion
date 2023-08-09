import axios from "axios";
import apiConnector from "../apiConnector";
import { endpointes } from "../apis";
import { setLoading } from "../../Storage/Slices/authSlice";
import { toast } from "react-hot-toast";

const generatePasswordToken = (email, setEmailSend) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      console.log(email);
      const response = await apiConnector(
        "POST",
        endpointes.RESETPASSTOKEN_API,
        { email }
      );
      console.log("Response---> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("reset password link send successfully");
      setEmailSend(true);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("failed send link");
      console.log("erroe occured generating token", error);
    }
  };
};

const resetPassword = (data, setIsResetCompleted) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(
        "POST",
        endpointes.RESET_PASSWORD_API,
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log(" Reset password Resonse--->", response);
      toast.success("password reset successfully");
      setIsResetCompleted(true);
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error --->", error);
      toast.error("error occured during password");
    }
  };
};

export { generatePasswordToken, resetPassword };
