import axios from "axios";
import apiConnector from "../apiConnector";
import { endpointes } from "../apis";
import {
  setLoading,
  setSignup,
  setToken,
} from "../../Storage/Slices/authSlice";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

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

const login = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", endpointes.LOGIN_API, data);
      if (!response.data.success) {
        throw new Error(response.data.massage);
      }

      console.log(response);
      toast.success("successfully login");
      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      toast.error("failed to login");
      console.log("error--->", error);
    }
  };
};

const sendOtp = (data, navigate) => {
  return async (dispatch) => {
    try {
      const { email } = data;
      const response = await apiConnector("POST", endpointes.SEND_OTP, {
        email,
      });
      console.log("hi");
      if (!response.data.success) {
        throw new Error("otp not send");
      }

      toast.success("otp send successfully");
      navigate("/verify-otp");
    } catch (error) {
      console.log("error", error);
      toast.error("could not send otp");
      navigate("/signup");
    }
  };
};

const singup = (data, navigate) => {
  return async (dispatch) => {
    try {
      console.log("singup sending data-->", data);
      const response = await apiConnector("POST", endpointes.SIGN_UP, data);
      console.log("heelo");
      if (response.data.success) {
        throw new Error("signup failed");
      }

      console.log("response --->", response);
      toast.success("signup successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("sign up failed");
      navigate("/signup");
    }
  };
};

export { generatePasswordToken, resetPassword, login, sendOtp, singup };
