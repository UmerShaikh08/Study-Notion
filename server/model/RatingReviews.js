import mongoose, { Schema, model } from "mongoose";

const RatingAndReviewsSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  review: {
    type: String,
    required: true,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const RatingReviews = model("RatingReviews", RatingAndReviewsSchema);
export { RatingReviews };
