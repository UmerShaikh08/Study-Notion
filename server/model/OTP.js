import { Schema, model } from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { otpTemplate } from "../mail/templates/emailVerfication.js";

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
    expires: 60 * 10,
  },
});

const mailVerification = async (email, otp) => {
  try {
    const otpPage = otpTemplate(otp);
    const info = await mailSender(email, otpPage, "Email Verification");
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
