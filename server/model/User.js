import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Admin", "Instructor"],
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

const User = model("User", UserSchema);

export { User };
