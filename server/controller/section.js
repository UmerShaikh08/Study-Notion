import { Course } from "../model/Course.js";
import { Section } from "../model/Section.js";

const createSection = async (req, res) => {
  try {
    // get data
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName) {
      return res.status(400).json({
        success: false,
        massag: "section name required",
      });
    }

    // create section, entry in db
    const newSection = await Section.create({
      sectionName,
    });

    // add section in Course.coursecontent array
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log(updateCourse);
    // send res
    return res.status(200).json({
      success: true,
      massag: "new section created successfully",
      course: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massag: "error occured while creating section",
    });
  }
};

const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    console.log(req.body);
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        massag: "section name required",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    if (!updateSection) {
      return res.status(400).json({
        success: false,
        massag: "section not updated",
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
        massag: "course not found",
      });
    }

    return res.status(200).json({
      course,
      success: true,
      massag: "section updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massag: "error occured while updating section",
    });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.body;
    console.log(req.body);

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        massag: "all fields are required",
      });
    }

    const deleteSection = await Section.findOneAndDelete({ _id: sectionId });
    console.log("hi");

    const updateCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      massag: "section successfully deleted",
      course: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massag: "erro occured while deleting section",
    });
  }
};

export { createSection, updateSection, deleteSection };
