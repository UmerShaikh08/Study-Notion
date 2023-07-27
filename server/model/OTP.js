import { Schema, model } from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

const mailVerification = async (email, otp) => {
  try {
    const info = await mailSender(
      email,
      `<h1> OTP is ${otp} </h1>`,
      "email verification"
    );
    console.log("mail send successfully --> ", info);
  } catch (error) {
    console.log("error occur in mailVerification ", error);
    throw error;
  }
};

OtpSchema.pre("save", async function (next) {
  console.log(this.otp);
  await mailVerification(this.email, this.otp);
  next();
});

const OTP = model("OTP", OtpSchema);
export { OTP };
