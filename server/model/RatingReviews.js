import mongoose, { Schema, model } from "mongoose";

const RatingAndReviewsSchema = new Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rating: {
    type: Number,
    required: true,
  },
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
