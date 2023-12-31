import mongoose, { Schema, model } from "mongoose";

// video details
const SubSectionSchema = new Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: Number,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

const SubSection = model("SubSection", SubSectionSchema);
export { SubSection };
