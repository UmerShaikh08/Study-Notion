import { Router } from "express";
import {
  addCategory,
  categoryPageDetails,
  showAllCategories,
} from "../controller/category.js";
import {
  createRatingReviews,
  getAllRatingReviews,
  getAvgrating,
} from "../controller/RatingAndReviews.js";
import { auth, isAdmin, isStudent } from "../middleware/auth.js";

const courseRoutes = Router();

// ***************************************************************************************************************************************
//                                                              Category Routes
// ***************************************************************************************************************************************

courseRoutes.post("/createCategory", auth, isAdmin, addCategory);
courseRoutes.get("/showCategory", showAllCategories);
courseRoutes.post("/categoryPageDetails", categoryPageDetails);

// ***************************************************************************************************************************************
//                                                              Rating and Reviews Routes
// ***************************************************************************************************************************************
courseRoutes.post("/createRatingReviews", auth, isStudent, createRatingReviews);
courseRoutes.post("/getAverageRating", getAvgrating);
courseRoutes.get("/getAllReviews", getAllRatingReviews);

export { courseRoutes };
