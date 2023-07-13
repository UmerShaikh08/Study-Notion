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
  WhatYouWeLearn: {
    type: String,
  },
  courseContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  RatingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingReviews",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },
  studentsEnrolled: [
    {
      type: String,
      required: true,
    },
  ],
});

const Course = model("Course", CourseSchema);

export { Course };
