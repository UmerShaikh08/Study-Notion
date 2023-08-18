import { Router } from "express";
import { changePassword, logIn, sendOtp, signUp } from "../controller/Auth.js";
import {
  CreateResetPasswordToken,
  resetPassword,
} from "../controller/ResetPassword.js";
import { auth } from "../middleware/auth.js";
import { contactUs } from "../controller/contactUs.js";

const userRoutes = Router();

// ***************************************************************************************************************************************
//                                                              Authentication Routes
// ***************************************************************************************************************************************

// route for the sign up
userRoutes.post("/signUp", signUp);

// route form the login
userRoutes.post("/login", logIn);

// route for sent otp
userRoutes.post("/sendOtp", sendOtp);

// route for the changing the password
userRoutes.put("/changePassword", auth, changePassword);

export { userRoutes };
