import { Router } from "express";
import {
  addCategory,
  categoryPageDetails,
  getCategory,
  showAllCategories,
} from "../controller/category.js";
import {
  createRatingReviews,
  getAllRatingReviews,
  getAvgrating,
} from "../controller/RatingAndReviews.js";
import { auth, isAdmin, isInstructor, isStudent } from "../middleware/auth.js";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controller/section.js";
import {
  createSubsection,
  deleteSubsection,
  updateSubsection,
} from "../controller/subsection.js";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getCourseFullDetails,
  getEnrolledCourses,
  getInstructorCourses,
  removeCourseFromStudent,
} from "../controller/course.js";
import {
  addCourseProgress,
  getCourseProgress,
} from "../controller/CourseProgress.js";

const courseRoutes = Router();

// ***************************************************************************************************************************************
//                                                              Course Routes
// ***************************************************************************************************************************************

courseRoutes.post("/createCourse", auth, isInstructor, createCourse);
courseRoutes.post("/editCourse", auth, isInstructor, editCourse);
courseRoutes.delete("/deleteCourse", auth, isInstructor, deleteCourse);
courseRoutes.get("/getAllCourses", getAllCourses);
courseRoutes.post("/getCoursesDetails", getCourseDetails);
courseRoutes.get("/getEnrolledCourse", auth, isStudent, getEnrolledCourses);
courseRoutes.post(
  "/removed-enrolledcourse",
  auth,
  isStudent,
  removeCourseFromStudent
);
courseRoutes.get(
  "/getInstructorCourses",
  auth,
  isInstructor,
  getInstructorCourses
);
courseRoutes.post("/getCourseFullDetails", auth, getCourseFullDetails);

// ***************************************************************************************************************************************
//                                                              Category Routes
// ***************************************************************************************************************************************

courseRoutes.post("/createCategory", auth, isAdmin, addCategory);
courseRoutes.get("/showAllCategories", showAllCategories);
courseRoutes.post("/getCategory", getCategory);
courseRoutes.post("/getCategoryPageDetails", categoryPageDetails);

// ***************************************************************************************************************************************
//                                                              Rating and Reviews Routes
// ***************************************************************************************************************************************
courseRoutes.post("/createRatingReviews", auth, isStudent, createRatingReviews);
courseRoutes.post("/getAverageRating", getAvgrating);
courseRoutes.get("/getAllReviews", getAllRatingReviews);

// ***************************************************************************************************************************************
//                                                              Sections
// ***************************************************************************************************************************************
courseRoutes.post("/createSection", auth, isInstructor, createSection);
courseRoutes.post("/updateSection", auth, isInstructor, updateSection);
courseRoutes.post("/deleteSection", auth, isInstructor, deleteSection);

// ***************************************************************************************************************************************
//                                                             Sub Sections
// ***************************************************************************************************************************************

courseRoutes.post("/createSubSection", auth, isInstructor, createSubsection);
courseRoutes.post("/updatSubSection", auth, isInstructor, updateSubsection);
courseRoutes.post("/deleteSubSection", auth, isInstructor, deleteSubsection);

// ***************************************************************************************************************************************
//                                                             Course Progress
// ***************************************************************************************************************************************

courseRoutes.post("/addCourseProgress", auth, isStudent, addCourseProgress);
courseRoutes.post("/getCourseProgress", auth, isStudent, getCourseProgress);

export { courseRoutes };
