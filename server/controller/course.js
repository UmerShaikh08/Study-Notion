import { Course } from "../model/Course.js";
import { User } from "../model/User.js";
import { Tag } from "../model/tag";
import { imgUploadToCloudinary } from "../utils/imgUploader.js";
import dotenv from "dotenv";

const createCourse = async (req, res) => {
  try {
    //confing dotenv
    dotenv.config({ path: ".env" });

    // get userId from req it added in auth middleware
    const userId = req.user.id;

    // get img from file
    const img = req.files.ImgFile;
    // get data
    const { courseName, courseDescription, WhatYouWeLearn, tag, price } =
      req.body;

    // validate data
    if (!courseName || !courseDescription || !WhatYouWeLearn || !tag) {
      res.status(400).json({
        success: false,
        massage: "please fields are required",
      });
    }

    // get Instructor
    const Instructor = await User.findById(userId);

    // validate instructor present or not
    if (!Instructor) {
      res.status(400).json({
        success: false,
        massage: "Instructor in not found",
      });
    }

    // get tag
    const tagDetails = await Tag.findById(tag);
    // validate tag present or not
    if (!tag) {
      res.status(400).json({
        success: false,
        massage: "Tag in not found",
      });
    }

    // upload img on cloudinary storage
    const thumbnailImg = await imgUploadToCloudinary(
      img,
      process.env.FOLDER_NAME
    );

    // create new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      thumbnail: thumbnailImg,
      tag: tagDetails._id,
      instructor: Instructor._id,
    });

    // add new course in User instructor course List
    await User.findByIdAndUpdate(
      { _id: Instructor._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // add new course in Tag course List
    await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );

    // return res
    res.status(400).json({
      success: true,
      massage: "new course created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "failed to create course",
    });
  }
};

const getAllcourses = async (req, res) => {
  try {
    // get  all courses from db
    const allCourses = await Tag.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        RatingAndReviews: true,
        instructor: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    console.log(allCourses);

    // return res
    res.status(200).json({
      success: true,
      massage: "all courses get successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occurs while getting all tag",
    });
  }
};
export { createCourse, getAllcourses };
