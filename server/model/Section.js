import mongoose, { Schema } from "mongoose";

const SectionSchema = new Schema({
  sectionName: {
    type: String,
  },

  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubSection",
    },
  ],
});
