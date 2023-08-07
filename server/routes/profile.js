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

// ***************************************************************************************************************************************
//                                                              profile Routes
// ***************************************************************************************************************************************

profileRoutes.put("/updateProfile", auth, updateProfile);
profileRoutes.put("/updateProfileImg", updateProfileImg);
profileRoutes.get("/getUserData", auth, getUserData);
profileRoutes.post("/resetPasswordToken", CreateResetPasswordToken);
profileRoutes.post("/resetPassword", resetPassword);
profileRoutes.delete("/deleteAccount", auth, deleteAccount);

export { profileRoutes };
