import mongoose, { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  whatYouWillLearn: {
    type: String,
  },
  // section
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  RatingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingReviews",
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  studentsEnrolled: [
    {
      type: String,
      required: true,
    },
  ],
  requirements: {
    type: [],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = model("Course", CourseSchema);

export { Course };
