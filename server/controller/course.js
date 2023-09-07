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
    console.log(req.body);
    // get data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      category,
      price,
      tags,
      courseDuration = "0",
      requirements,
      status,
    } = req.body;

    // validate data
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !category ||
      !price ||
      !requirements ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        massage: "please fields are required",
      });
    }

    const requirementsArray = JSON.parse(requirements);

    // get Instructor
    const Instructor = await User.findById(userId);

    // validate instructor present or not
    if (!Instructor) {
      return res.status(400).json({
        success: false,
        massage: "Instructor in not found",
      });
    }

    // get category
    const categoryDetails = await Category.findById(category);
    // validate category present or not
    if (!categoryDetails) {
      return res.status(400).json({
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
      courseDuration,
      requirements: requirementsArray,
      status,
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
    return res.status(200).json({
      success: true,
      massage: "new course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "failed to create course",
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    console.log("updates ---> ", updates);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const options = {
        folder: "Study Notion",
      };
      const thumbnailImage = await imgUploadToCloudinary(thumbnail, {
        options,
      });
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("RatingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    // get  all courses from db
    const allCourses = await Course.find(
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
    console.log("all courses : --> ", allCourses);

    // return res
    return res.status(200).json({
      success: true,
      massage: "all courses get successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occurs while getting all courses",
    });
  }
};

const getCourseFullDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("RatingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        massage: `could not find the code with ${courseId}`,
      });
    }
    console.log(courseDetails);

    return res.status(200).json({
      success: true,
      massage: "course details get successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occurs while getting course full details",
    });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("RatingAndReviews");

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        massage: `could not find the code with ${courseId}`,
      });
    }
    console.log("course Details ---> ", courseDetails);

    return res.status(200).json({
      success: true,
      massage: "course details get successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occurs while getting course full details",
    });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // get user data and populate enrolled courses
    const studentData = await User.findById(userId).populate({
      path: "courses",
      populate: { path: "courseContent" },
    });

    // check user student or not
    if (studentData.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        massage: "User is not a student ",
      });
    }

    // return response

    return res.status(200).json({
      success: true,
      massage: "enrolled course fetched successfully ",
      courses: studentData?.courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occures while getting student all enrolled courses ",
    });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // get user data and populate instructor created courses
    const instructorCourses = await User.findById(userId).populate("courses");

    // check user student or not
    if (instructorCourses.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        massage: "User is not a Instructor  ",
      });
    }

    // return response

    return res.status(200).json({
      success: true,
      massage: "Instructor course fetched successfully ",
      Instructor: instructorCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occures while getting Instructor all  courses ",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    // get course Id
    const { courseId } = req.body;

    // get user id
    const userId = req.user.id;

    // get user data
    const userData = await User.findById(userId);

    // check instructor is valid or not
    if (!userData.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        massage: "This instructor not created this course",
      });
    }

    // delete course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // remove course from instructor course list
    await User.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    });

    const UpdatedCourses = await User.findById(userId).populate("courses");

    return res.status(200).json({
      success: true,
      massage: "course deleted successfully",
      Instructor: UpdatedCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "Intructor is not valid",
    });
  }
};

export {
  createCourse,
  getAllCourses,
  getCourseFullDetails,
  getCourseDetails,
  editCourse,
  getEnrolledCourses,
  getInstructorCourses,
  deleteCourse,
};
