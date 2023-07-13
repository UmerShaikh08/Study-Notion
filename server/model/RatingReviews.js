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
  reviews: {
    type: String,
    required: true,
  },
});

const RatingReviews = model("RatingReviews", RatingAndReviewsSchema);
export { RatingReviews };
