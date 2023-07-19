import mongoose, { Schema, model } from "mongoose";

// section of videos
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

const Section = model("Section", SectionSchema);
export { Section };
