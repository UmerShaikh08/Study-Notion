import { Router } from "express";
import {
  deleteAccount,
  getAllUserData,
  updateProfile,
  updateProfileImg,
} from "../controller/profile.js";
import { auth } from "../middleware/auth.js";

const profileRoutes = Router();

profileRoutes.put("/updateProfile", auth, updateProfile);
profileRoutes.delete("/deleteAccount", auth, deleteAccount);
profileRoutes.get("/getAllUserData", auth, getAllUserData);

profileRoutes.put("/updateProfileImg", updateProfileImg);

export { profileRoutes };
