import { Schema, model } from "mongoose";

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
    const info = await mailSender(email);
    console.log("mail send successfully --> ", info);
  } catch (error) {
    console.log("error occur in mailVerification ", error);
    throw error;
  }
};

OtpSchema.pre("save", async (next) => {
  await mailVerification(this.email, this.otp);
  next();
});

const OTP = model("OTP", OtpSchema);
export { OTP };
