import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  contactNumber: {
    type: String,
  },
  dataOfBirth: {
    type: String,
  },
  about: {
    type: String,
  },
});

const Profile = model("Profile", ProfileSchema);
export { Profile };
