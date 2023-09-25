import mongoose from "mongoose";
import { Course } from "../model/Course.js";
import { RatingReviews } from "../model/RatingReviews.js";
import { User } from "../model/User.js";

const createRatingReviews = async (req, res) => {
  try {
    // get data
    const { courseId, rating, review } = req.body;
    const userId = req.user.id;

    //console.log("req body ", req.body);
    //console.log(userId);
    if (!courseId || !rating || !review || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please set Rating and Review",
      });
    }

    const alreadyReviewed = await RatingReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You Already Rated",
      });
    }

    // validate student enrolled or not
    const userEnrolled = await Course.findOne({ _id: courseId });
    //console.log(userEnrolled);
    if (!userEnrolled.studentsEnrolled.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Failed to add rating",
      });
    }

    // create rating and reviews
    const newRatingReviews = await RatingReviews.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    //console.log(newRatingReviews);

    // update course
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          RatingAndReviews: newRatingReviews._id,
        },
      },

      { new: true }
    )
      .populate("RatingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      // updateCourse,
      message: "rating reviews successfully",
      course: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to add rating ",
    });
  }
};

const getAvgrating = async (req, res) => {
  try {
    const { courseId } = req.body;

    // aggregate function  return array
    const result = await RatingReviews.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          avarage: { $avg: "$rating" },
        },
      },
    ]);

    //console.log("hi");
    if (result.length == 0) {
      return res.status(400).json({
        success: false,
        message: "no rating found",
        avarageRating: 0,
      });
    }

    return res.status(200).json({
      success: true,
      avarageRating: result[0].avarage,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "error occurred while find avg of rating",
    });
  }
};

const getAllRatingReviews = async (req, res) => {
  try {
    const allReviews = await RatingReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "course",
        select: "courseName",
      })
      .populate({
        path: "user",
        select: "firstName lastName email img",
      });

    //console.log(allReviews);

    return res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error occured while getting all Rating and Reviews",
    });
  }
};

export { createRatingReviews, getAvgrating, getAllRatingReviews };
