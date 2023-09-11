import { Course } from "../model/Course.js";
import { Section } from "../model/Section.js";
import { SubSection } from "../model/SubSection.js";
import { videoUploader } from "../utils/videoUploader.js";
import dotenv from "dotenv";

const createSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const {
      sectionId,
      title,

      description,
      courseId,
    } = req.body;
    console.log(req.body);
    const file = req.files.videoFile;
    console.log(file);

    if (!sectionId || !title || !description || !courseId) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const videoDetails = await videoUploader(file, process.env.FOLDER_NAME);

    console.log("video details ---->", videoDetails);

    const time = parseInt(videoDetails?.duration);
    const newSubsection = await SubSection.create({
      title,
      description,
      videoUrl: videoDetails?.secure_url,
      timeDuration: time,
    });

    if (!newSubsection) {
      return res.status(400).json({
        success: false,
        massage: "Subsection is not created",
      });
    }

    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubsection._id },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    if (!updateSection) {
      return res.status(400).json({
        success: false,
        massage: "section is not updated",
      });
    }

    console.log("update section -->", updateSection);
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!course) {
      return res.status(400).json({
        success: false,
        massage: "course not found ",
      });
    }

    return res.status(200).json({
      success: true,
      course,
      massage: "subsection created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while creating subsection",
    });
  }
};

const updateSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { title, description, subSectionId, courseId } = req.body;

    const subsection = await SubSection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }
    console.log("req body ---->", req.body);
    if (title !== undefined) {
      subsection.title = title;
    }

    if (description !== undefined) {
      subsection.description = description;
    }

    if (req.files && req.files.videoFile !== undefined) {
      const file = req.files.videoFile;
      const uploadDetails = await videoUploader(file, process.env.FOLDER_NAME);
      subsection.videoUrl = uploadDetails.secure_url;
      subsection.timeDuration = uploadDetails.duration;
    }

    console.log("subsection ---> ", subsection);
    const newSubsection = await SubSection.findOneAndUpdate(
      { _id: subSectionId },

      {
        title: subsection.title,
        description: subsection.description,
        videoUrl: subsection.videoUrl,
        timeDuration: subsection.timeDuration,
      },

      { new: true }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!course) {
      return res.status(400).json({
        success: false,
        massage: "course not found ",
      });
    }

    return res.status(200).json({
      success: true,
      course,
      massage: "subsection updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while updating subsection",
    });
  }
};

const deleteSubsection = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    const { subSectionId, sectionId, courseId } = req.body;

    if (!subSectionId || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    // remove subsection id from section
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    const deletedSubsection = await SubSection.findOneAndDelete(subSectionId, {
      new: true,
    });

    console.log("deleted subsection -->>", deleteSubsection);
    if (!deletedSubsection) {
      return res.status(400).json({
        success: false,
        massage: "Subsection is not deleted",
      });
    }

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!course) {
      return res.status(400).json({
        success: false,
        massage: "course not found ",
      });
    }

    return res.status(200).json({
      course,
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
