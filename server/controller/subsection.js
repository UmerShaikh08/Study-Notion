import { Section } from "../model/Section.js";
import { SubSection } from "../model/SubSection.js";
import { videoUploader } from "../utils/videoUploader.js";
import dotenv from "dotenv";

const createSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { sectionId, title, timeDuration, description } = req.body;

    const file = req.files.videoFile;

    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const videoDetails = await videoUploader(file, process.env.FOLDER_NAME);
    console.log(videoDetails);

    const newSubsection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: videoDetails.secure_url,
    });

    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubsection._id },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      updateSection,
      massage: "subsection created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occured while creating subsection",
    });
  }
};

const updateSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { title, timeDuration, description, subSectionId } = req.body;

    const file = req.files.videoFile;
    console.log("file --->", file);
    if (!title || !timeDuration || !description || !subSectionId) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const videoDetails = await videoUploader(file, process.env.FOLDER_NAME);

    const newSubsection = await SubSection.findOneAndUpdate(
      { _id: subSectionId },
      {
        title,
        timeDuration,
        description,
        videoUrl: videoDetails.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      newSubsection,
      massage: "subsection updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occured while updating subsection",
    });
  }
};

const deleteSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const newSubsection = await SubSection.findOneAndDelete(subSectionId, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      massage: "subsection deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occured while deleting subsection",
    });
  }
};

export { createSubsection, updateSubsection, deleteSubsection };
