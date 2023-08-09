import { Router } from "express";
import {
  deleteAccount,
  getUserData,
  updateProfile,
  updateProfileImg,
} from "../controller/profile.js";
import { auth } from "../middleware/auth.js";
import {
  CreateResetPasswordToken,
  resetPassword,
} from "../controller/ResetPassword.js";

const profileRoutes = Router();

profileRoutes.put("/updateProfile", auth, updateProfile);
profileRoutes.put("/updateProfileImg", updateProfileImg);
profileRoutes.get("/getUserData", auth, getUserData);
profileRoutes.delete("/deleteAccount", auth, deleteAccount);

// ***************************************************************************************************************************************
//                                                             reset password routes
// ***************************************************************************************************************************************

profileRoutes.post("/resetPasswordToken", CreateResetPasswordToken);
profileRoutes.post("/resetPassword", resetPassword);

export { profileRoutes };
