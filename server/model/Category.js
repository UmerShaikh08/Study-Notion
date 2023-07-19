import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
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

const Category = model("Category", categorySchema);
export { Category };
