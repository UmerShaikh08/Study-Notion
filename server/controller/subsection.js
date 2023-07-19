import { Section } from "../model/Section";
import { SubSection } from "../model/SubSection";
import { videoUploader } from "../utils/videoUploader";
import dotenv from "dotenv";

const createSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { sectionId, title, timeDuration, description } = req.body;

    const file = req.files.videoFile;

    if (!sectionId || !title || !timeDuration || !description) {
      res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const videoDetails = videoUploader(file, process.env.FOLDER_NAME);

    const newSubsection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: videoDetails.secure_Url,
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

    res.status(200).json({
      success: true,
      massage: "subsection created successfully",
    });
  } catch (error) {
    res.status(400).json({
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

    if (!title || !timeDuration || !description || !subSectionId) {
      res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const videoDetails = videoUploader(file, process.env.FOLDER_NAME);

    const newSubsection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title,
        timeDuration,
        description,
        videoUrl: videoDetails.secure_Url,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      massage: "subsection updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while updating subsection",
    });
  }
};

const deleteSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { subSectionId } = req.body;

    if (!subSectionId) {
      res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const newSubsection = await SubSection.findOneAndDelete(subSectionId, {
      new: true,
    });

    res.status(200).json({
      success: true,
      massage: "subsection deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while deleting subsection",
    });
  }
};

export { createSubsection, updateSubsection, deleteSubsection };
