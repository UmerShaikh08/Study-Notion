import mongoose, { Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Tag = model("Tag", TagSchema);
export { Tag };
