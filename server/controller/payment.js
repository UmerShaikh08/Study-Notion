import mongoose from "mongoose";
import { Course } from "../model/Course.js";
import { instance } from "../config/razorpay.js";
import { User } from "../model/User.js";
import { mailSender } from "../utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";

const capturePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courses } = req.body;

    if (!userId || !courses) {
      return res.json({
        success: false,
        massage: "please provide user id or courses id",
      });
    }

    const UID = mongoose.Types.ObjectId(userId);

    let totalPrice = 0;
    for (const courseId of courses) {
      try {
        const course = await Course.findById(courseId);

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
    console.log(paymentResponse);

    if (!paymentResponse) {
      return res.status(401).json({
        success: false,
        massage: "error occured while creating order",
      });
    }

    return res.status(200).json({
      success: true,
      massage: paymentResponse,
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

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    res.status(400).json({
      success: false,
      massage: "Payment Failed",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // create signature using razorpay secret Id
  // shasm algo
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // check same or not if same
  if (expectedSignature === razorpay_signature) {
    // add all courses in student enrolled courses list because he buyed all course
    // add student in course student enrolled list
    for (const courseId of courses) {
      try {
        // add user id in Course.studentEnrolled list
        const course = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: { studentsEnrolled: userId },
          },
          { new: true }
        );

        // add course in student course list
        const student = await User.findByIdAndUpdate(
          userId,
          {
            $push: { courses: courseId },
          },
          { new: true }
        );

        // create templet
        const enrolledTemplet = courseEnrollmentEmail(
          course?.courseName,
          student.firstName + " " + student.lastName
        );

        //  send mail student to enrolled course successfully
        const email = mailSender(
          student.email,
          `Successfully Enrolled into ${course.courseName}`,
          enrolledTemplet
        );

        // send response
        console.log("Email send successfully --->", email);
        res.status(200).json({
          success: false,
          massage: "Payment Verified",
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          massage: "Payment Failed",
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

export { capturePayment, verifyPaymentSignature };
