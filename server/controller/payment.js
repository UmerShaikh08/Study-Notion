import mongoose from "mongoose";
import { Course } from "../model/Course.js";
import { instance } from "../config/razorpay.js";
import { User } from "../model/User.js";
import { mailSender } from "../utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";

const capturePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // validate user
    if (!userId) {
      return res.status(403).json({
        success: false,
        massage: "please provide valid  user id",
      });
    }
    if (!courseId) {
      return res.status(403).json({
        success: false,
        massage: "please provide valid  course id",
      });
    }

    const course = await Course.findById(courseId);

    // validate couser present or not
    if (!course) {
      return res.status(403).json({
        success: false,
        massage: "course not found",
      });
    }

    // convert String to id because in model store userId as a object
    const UID = mongoose.Types.ObjectId(userId);

    // validate user already enrolled or not
    if (course.studentsEnrolled.includes(UID)) {
      return res.status(403).json({
        success: false,
        massage: "User already enrolled",
      });
    }

    // 500.00 adding last 00 zeroes
    const amount = course.price * 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        // userId , courseId added for verifying razor pay req and give course student
        userId,
        courseId,
      },
    };

    // create payment
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: courseDescription,
      courseThumbail: course.courseThumbail,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      massage: "error occured while capturing payment",
    });
  }
};

const verifySignature = async (req, res) => {
  const webhook = "12345";
  const signature = req.headers["x-razorpay-signature"];

  // sha256 algo to encrypt data and add webhook in incrypt data
  const shasum = crypto.createHmac("sha256", webhook);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  // check ecrypted data match with razor pay incrypted data
  if (digest === signature) {
    console.log(digest);

    // added when creating order
    const userId = req.body.payload.entity.notes.userId;
    const courseId = req.body.payload.entity.notes.courseId;

    // adding user in enrolled students array
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(401).json({
          success: false,
          massage: "course not found ",
        });
      }
      console.log(enrolledCourse);

      // adding course in User enrolled courses  list
      const enrolledUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { courses: courseId },
        },
        { new: true }
      );

      if (!enrolledUser) {
        return res.status(401).json({
          success: false,
          massage: "User not found ",
        });
      }
      console.log(enrolledUser);

      const emailResponse = mailSender(
        enrolledUser.email,
        courseEnrollmentEmail,
        "Conrahulation from Study Notion "
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        massage: "Signature is Verified and Course Added",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        massage: "error occured while updating user when verify signature ",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      massage: "Invalid request",
    });
  }
};

export { capturePayment, verifySignature };
