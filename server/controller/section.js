import { Course } from "../model/Course";
import { Section } from "../model/Section";

const createSection = async (req, res) => {
  try {
    // get data
    const { sectionName, courseId } = req.body;

    // validate data
    if (!sectionName) {
      res.status(400).json({
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
      .populate("Section")
      .exec();

    console.log(updateCourse);
    // send res
    res.status(200).json({
      success: true,
      massag: "new section created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      massag: "error occured while creating section",
    });
  }
};

const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      res.status(400).json({
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

    res.status(400).json({
      success: true,
      massag: "section updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massag: "error occured while updating section",
    });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { courseId } = req.body;
    const sectionId = req.params;

    if (!sectionId || !courseId) {
      res.status(400).json({
        success: false,
        massag: "all fields are required",
      });
    }

    const deleteSection = await Section.findByIdAndDelete(sectionId);

    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: courseId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      massag: "section successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massag: "erro occured while deleting section",
    });
  }
};

export { createSection, updateSection, deleteSection };
