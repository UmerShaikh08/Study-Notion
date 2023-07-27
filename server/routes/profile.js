import { Router } from "express";
import {
  deleteAccount,
  getAllUserData,
  updateProfile,
} from "../controller/profile.js";
import { auth } from "../middleware/auth.js";

const profileRoutes = Router();

profileRoutes.put("/updateProfile", auth, updateProfile);
profileRoutes.delete("/deleteAccount", auth, deleteAccount);
profileRoutes.get("/getAllUserData", auth, getAllUserData);

export { profileRoutes };
