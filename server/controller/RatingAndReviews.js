import mongoose from "mongoose";
import { Course } from "../model/Course.js";
import { RatingReviews } from "../model/RatingReviews.js";

const createRatingReviews = async (req, res) => {
  try {
    // get data
    const { courseId, rating, reviews } = req.body;
    const userId = req.user.id;

    // validate student enrolled or not
    const userEnrolled = await Course.findById(courseId);

    if (!userEnrolled.studentsEnrolled.includes(userId)) {
      res.status(400).json({
        success: false,
        massage: "student not enrolled course",
      });
    }
    // check student already created ratingReviews or not
    if (userEnrolled.RatingAndReviews.includes(userId)) {
      res.status(400).json({
        success: false,
        massage: "student already rated and give review",
      });
    }
    // create rating and reviews
    const newRatingReviews = await RatingReviews.create({
      user: userId,
      rating,
      reviews,
    });
    console.log(newRatingReviews);
    // update course
    const updateCourse = Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: { RatingAndReviews: newRatingReviews._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      massage: "rating reviews successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while creating Rating and Reviews",
    });
  }
};

const getAvgrating = async (req, res) => {
  try {
    const { courseId } = req.body;

    // aggregate function  return array
    const result = await RatingReviews.aggregate([
      {
        $match: { course: mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          avarage: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length == 0) {
      res.status(400).json({
        success: false,
        massage: "no rating found",
        avarageRating: 0,
      });
    }

    res.status(200).json({
      success: true,
      avarageRating: result[0].avarage,
    });
  } catch (error) {}
};

const getAllRatingReviews = (req, res) => {
  try {
    const allReviews = RatingReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "course",
        select: "courseName",
      })
      .populate({
        path: "User",
        select: "firstName lastName email img",
      });

    res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while getting all Rating and Reviews",
    });
  }
};

export { createRatingReviews, getAvgrating, getAllRatingReviews };
