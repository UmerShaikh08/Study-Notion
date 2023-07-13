import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  dataOfBirth: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

const Profile = model("Profile", ProfileSchema);
export { Profile };
