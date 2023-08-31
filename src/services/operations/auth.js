import axios from "axios";
import apiConnector from "../apiConnector";
import { endpointes } from "../apis";
import { setLoading, setSignup, setToken } from "../../Redux/Slices/authSlice";
import { toast } from "react-hot-toast";
import { setUser } from "../../Redux/Slices/profileSlice";
import { clearCart } from "../../Redux/Slices/cartSlice";

const generatePasswordToken = (email, setEmailSend) => {
  return async (dispatch) => {
    try {
      // show loader
      dispatch(setLoading(true));
      console.log(email);

      // call db for creating password token
      const response = await apiConnector(
        "POST",
        endpointes.RESETPASSTOKEN_API,
        { email }
      );
      console.log("Response---> ", response);

      // check req
      if (!response.data.success) {
        throw new Error(response.error.massage);
      }

      //  display success toast
      toast.success("reset password link send successfully");
      setEmailSend(true);

      dispatch(setLoading(false));
    } catch (error) {
      toast.error("failed send link");
      console.log("erroe occured generating token", error);
      dispatch(setLoading(false));
    }
  };
};

const resetPassword = (data, setIsResetCompleted) => {
  console.log(data);
  return async (dispatch) => {
    try {
      // show loader
      dispatch(setLoading(true));

      // db call for reset password
      const response = await apiConnector(
        "POST",
        endpointes.RESET_PASSWORD_API,
        data
      );

      //  check req
      if (!response.data.success) {
        dispatch(setLoading(false));
        throw new Error(response.data.message);
      }

      //  display success toast
      console.log(" Reset password Response--->", response);
      toast.success("password reset successfully");
      setIsResetCompleted(true);
      dispatch(setLoading(false));
    } catch (error) {
      console.log("error --->", error);
      toast.error("Please try again");
      dispatch(setLoading(false));
    }
  };
};

const login = (data, navigate) => {
  return async (dispatch) => {
    try {
      // show loader
      dispatch(setLoading(true));

      // call db for login
      const response = await apiConnector("POST", endpointes.LOGIN_API, data);
      if (!response.data.success) {
        dispatch(setLoading(false));
        throw new Error(response.data.massage);
      }

      console.log(response);
      toast.success("successfully login");

      // set user
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setLoading(false));

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error("failed to login");
      console.log("error--->", error);
      dispatch(setLoading(false));
    }
  };
};

const sendOtp = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { email } = data;
      const response = await apiConnector("POST", endpointes.SEND_OTP, {
        email,
      });
      console.log(response);
      if (!response.data.success) {
        dispatch(setLoading(false));
        throw new Error("otp not send");
      }

      toast.success("otp send successfully");
      dispatch(setLoading(false));

      navigate("/verify-otp");
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      dispatch(setLoading(false));

      navigate("/signup");
    }
  };
};

const singup = (data, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      console.log("singup sending data-->", data);
      const response = await apiConnector("POST", endpointes.SIGN_UP, data);
      console.log("heelo");
      if (!response.data.success) {
        dispatch(setLoading(false));
        throw new Error("signup failed");
      }

      console.log("response --->", response);
      toast.success("signup successfully");

      navigate("/login");
    } catch (error) {
      console.log("error", error);
      toast.error("sign up failed");
      dispatch(setLoading(false));
      navigate("/signup");
    }
  };
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(clearCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export { generatePasswordToken, resetPassword, login, sendOtp, singup };
