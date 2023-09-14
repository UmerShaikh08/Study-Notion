import mongoose from "mongoose";
import { CourseProgress } from "../model/CourseProgress.js";
import { User } from "../model/User.js";

const addCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    if (!courseId && !userId && !subsectionId) {
      return res.status(400).json({
        success: false,
        massage: "all field are required",
      });
    }

    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        userId,
        courseId,
      });
      console.log("course progress after creating --->", courseProgress);
    }

    if (courseProgress?.completedVideos.includes(subsectionId)) {
      return res.status(400).json({
        success: false,
        massage: "lecture is already marked",
      });
    }

    const updateCourseProgress = await CourseProgress.findOneAndUpdate(
      {
        courseId: courseId,
        userId: userId,
      },
      {
        $push: { completedVideos: subsectionId },
      },
      { new: true }
    );

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { courseProgress: updateCourseProgress._id },
      },
      { new: true }
    );

    console.log("course progress after updating --->", updateCourseProgress);

    if (!updateCourseProgress) {
      return res.status(400).json({
        success: false,
        massage: "Failed to add course",
      });
    }

    return res.status(200).json({
      success: true,
      massage: "Course lecture Marked successfully",
      courseProgress: updateCourseProgress,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "failed to mark as a completed ",
    });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.user.id;

    const courseProgress = await CourseProgress.find({
      userId: userId,
      courseId: courseId,
    });

    if (!courseProgress[0]) {
      return res.status(400).json({
        success: false,
        massage: "course not found",
      });
    }

    return res.status(200).json({
      success: false,
      massage: "full Course progress ",
      courseProgress: courseProgress,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "failed to get course progress",
    });
  }
};

export { addCourseProgress, getCourseProgress };
