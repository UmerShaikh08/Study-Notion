import { Course } from "../model/Course.js";
import { User } from "../model/User.js";
import { Category } from "../model/Category.js";
import { imgUploadToCloudinary } from "../utils/imgUploader.js";
import dotenv from "dotenv";

const createCourse = async (req, res) => {
  try {
    //config dotenv
    dotenv.config({ path: ".env" });

    // get userId from req ,  it added in auth middleware
    // matlab instructor course create karra he use phele log in kiye hoga , login karte waqt middlwear excecute hua hoga or usme hume req ke andar  decode send kiya tha
    const userId = req.user.id;

    // get img from file
    const img = req.files.ImgFile;

    // get data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      category,
      price,
      tags,
    } = req.body;

    // validate data
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !category ||
      !price
    ) {
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

    // get category
    const categoryDetails = await Category.findById(category);
    // validate category present or not
    if (!categoryDetails) {
      res.status(400).json({
        success: false,
        massage: "category in not found",
      });
    }

    // upload img on cloudinary storage
    const thumbnailImg = await imgUploadToCloudinary(img, {
      folder: process.env.FOLDER_NAME,
    });

    console.log(thumbnailImg);

    // create new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      thumbnail: thumbnailImg.secure_url,
      category: categoryDetails._id,
      instructor: Instructor._id,
      whatYouWillLearn,
      tags,
    });

    // add new course in User instructor course List
    await User.findByIdAndUpdate(
      { _id: Instructor._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // add new course in category course List
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
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

const getAllCourses = async (req, res) => {
  try {
    // get  all courses from db
    const allCourses = await Category.find(
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
      massage: "error occurs while getting all category",
    });
  }
};

const getCourseDetails = (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "addtionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReviews")
      .populate({
        Path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({})
      .exec();

    if (!courseDetails) {
      res.status(400).json({
        success: false,
        massage: `could not find the code with ${courseId}`,
      });
    }
    console.log(courseDetails);

    res.status(200).json({
      success: true,
      massage: "course details get successfully",
      data: courseDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occurs while getting course full details",
    });
  }
};
export { createCourse, getAllCourses, getCourseDetails };
