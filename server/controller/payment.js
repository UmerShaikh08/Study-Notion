import mongoose from "mongoose";
import { Course } from "../model/Course.js";
import { instance } from "../config/razorpay.js";
import { User } from "../model/User.js";
import { mailSender } from "../utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import { paymentSuccessEmail } from "../mail/templates/paymentSuccessEmail.js";
import crypto from "crypto";

const capturePayment = async (req, res) => {
  try {
    console.log("i am in capture payment");
    const userId = req.user.id;
    const { courses } = req.body;

    if (!userId || !courses) {
      return res.json({
        success: false,
        massage: "please provide user id or courses id",
      });
    }

    const UID = new mongoose.Types.ObjectId(userId);

    let totalPrice = 0;
    console.log("courses--->", courses);
    for (const courseId of courses) {
      try {
        const course = await Course.findById(courseId?.id);

        if (!course) {
          return res.json({
            success: false,
            massage: "course not found",
          });
        }

        if (course.studentsEnrolled.includes(UID)) {
          return res.json({
            success: false,
            massage: "User already enrolled",
          });
        }
        totalPrice += course.price;
      } catch (error) {
        return res.json({
          success: false,
          massage: "Something went wrong while buying course",
        });
      }
    }

    const amount = totalPrice * 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        // userId , courseId added for verifying razor pay req and give course student
        userId,
      },
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("Payment response --->", paymentResponse);

    if (!paymentResponse) {
      return res.status(401).json({
        success: false,
        massage: "error occured while creating order",
      });
    }

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      massage: "error occured while capturing payment",
    });
  }
};

const verifyPaymentSignature = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const { courses } = req.body;
  const userId = req.user.id;

  console.log("verify data---->", courses);
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      massage: "All fields are required",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // create signature using razorpay secret Id
  // shasm algo
  const expectedSignature = await crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // check same or not if same
  if (expectedSignature === razorpay_signature) {
    // add all courses in student enrolled courses list because he buyed all course
    // add student in course student enrolled list
    for (const courseId of courses) {
      console.log("course id--->", courseId?.id);
      try {
        // add user id in Course.studentEnrolled list
        const course = await Course.findByIdAndUpdate(
          courseId.id,
          {
            $push: { studentsEnrolled: userId },
          },
          { new: true }
        );

        // add course in student course list
        const student = await User.findByIdAndUpdate(
          userId,
          {
            $push: { courses: courseId.id },
          },
          { new: true }
        );

        // create templet
        const enrolledTemplet = courseEnrollmentEmail(
          course?.courseName,
          student?.firstName + " " + student?.lastName
        );

        //  send mail student to enrolled course successfully
        const email = mailSender(
          student.email,

          enrolledTemplet,
          `Successfully Enrolled into ${course.courseName}`
        );

        // send response
        console.log("Email send successfully --->", email);
        return res.status(200).json({
          success: false,
          massage: "Payment Verified",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          massage: "Failed to add course in enrolled list of user and course",
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
      massage: "Payment Failed",
    });
  }
};

const paymentSuccessfull = async (req, res) => {
  try {
    const { amount, orderId, paymentId } = req.body;
    const userId = req.user.id;

    if (!amount || !orderId || !paymentId || !userId) {
      return res.status(400).json({
        success: false,
        massage: "all fields are required",
      });
    }

    const student = await User.findById(userId);
    const name = `${student?.firstName} ${student?.lastName} `;

    const template = paymentSuccessEmail(name, amount, orderId, paymentId);
    const mail = await mailSender(student?.email, template, "Payment Recieved");

    return res.status(200).json({
      success: true,
      massage: "massage send successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { capturePayment, verifyPaymentSignature, paymentSuccessfull };
